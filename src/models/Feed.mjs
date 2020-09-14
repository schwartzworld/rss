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
            const feed = await parser.parseURL(url);
            const posts = feed.items.map(item => {
                delete item['content:encoded'];
                delete item['content:encodedSnippet'];

                return {
                    ...item,
                    pubDate: new Date(item.pubDate).valueOf(),
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

export class Feed {
    static add = async (url) => {
        return new Promise(async (resolve) => {
            if (url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
                await DB.run(`insert into feeds (url) values('${url}')`);
                getSources(async() => {
                    resolve();
                });
            }
        })
    }

    static delete = async (id) => {
        await DB.run(`DELETE FROM feeds WHERE id=${id};`);
        return getSources();
    }

    static getAll = () => {
        return DB.all(`SELECT * FROM feeds`);

    }
    static build = () => {
        return new Promise(async (resolve, reject) => {
            const rows = await Feed.getAll()
            let values = await Promise.all(rows.map(row => {
                return ParsedFeed.build(row)
            }));
            let feed = [...values].filter(value => {
                return Boolean(value) && value.length > 0;
            }).join(',\n')
            const query = `INSERT or IGNORE INTO posts (link, title, pubDate, feed_id, description) VALUES ${feed};`;
            db.run(query, (e) => {
                if (e) reject(e);
                resolve();
            });
        })
    }
}
