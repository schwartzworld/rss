import Parser from "rss-parser";
import {db, getSources} from "../../index.mjs";
import {DB} from "../util/DB.mjs";

const parser = new Parser();

export class ParsedFeed {
    static sanitize = (str = '', key) => {
        try {
            return str.replace(/'/g, "''");
        } catch (e) {
            console.error(key, str, e.message);
            return 'invalid';
        }
    }
    static build = async ({id, url}) => {
        try {
            console.log({ id, url })
            const feed = await parser.parseURL(url);
            const posts = feed.items.map(item => {
                delete item['content:encoded'];
                delete item['content:encodedSnippet'];
                const pubDate = new Date(item.pubDate).valueOf();
                return {
                    ...item,
                    pubDate
                };
            });

            return posts.map(({link, title, pubDate, content}) => {
                return `('${ParsedFeed.sanitize(link, 'link')}', '${ParsedFeed.sanitize(title, 'title')}', '${ParsedFeed.sanitize(pubDate.toString(), 'pubDate')}',  ${Number(id)}, '${ParsedFeed.sanitize(content, 'content')}')`
            });
        } catch (e) {
            return console.error('f', e.message, url)
        }
    }
}

let urls = [];
let counter = Math.floor(Math.random() * 20);

export class Feed {
    static add = async (url) => {
        return new Promise(async (resolve) => {
            if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
                const x = await DB.run(`insert into feeds (url) values('${url}')`);
                getSources(async() => {
                    console.log(`${url} added`)
                    resolve(x);
                });
            }
        })
    }

    static get = async ({ url }) => {
        return DB.get(`SELECT * FROM feeds WHERE url='${url}';`)
    }

    static insert = async (values) => {
        const query = `INSERT or IGNORE INTO posts (link, title, pubDate, feed_id, description) VALUES ${values};`;
        return DB.run(query);
    }

    static delete = async (id) => {
        await DB.run(`DELETE FROM feeds WHERE id=${id};`);
        return getSources();
    }

    static getAll = () => {
        return DB.all(`SELECT * FROM feeds`);

    }

    static buildIndividualById = async (feedId) => {
        const id = Number(feedId)
        const {url} = await DB.get(`SELECT url FROM feeds WHERE id=${id}`)
        let row = await ParsedFeed.build({
            id, url: url
        })
        if (row) {
            await Feed.insert(row);
            console.log(url + ' buigitallt')
        }
    }

    static buildIndivdual = async () => {
        const r = urls[counter % urls.length];
        try {
            console.log("Building " + r.url)
            if (r.url && r.url.length > 0) {
                let row = await ParsedFeed.build(r)
                if (row) {
                    await Feed.insert(row);
                    console.log(r.url + ' built')
                }
            } else {
                console.log(JSON.stringify(r))
            }
        } catch (e) {
            console.error('Problem building feed: ' + r.url + e)
        } finally {
            counter++;
        }
    }

    static build = async () => {
        const rows = await Feed.getAll();
        urls = rows;
    }
}
