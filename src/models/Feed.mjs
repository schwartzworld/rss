import Parser from "rss-parser";
import {db} from "../../index.mjs";

const handle = (error, ...rest) => {
    console.log(error.message, ...rest);
    process.exit();
};

const parser = new Parser();

export class ParsedFeed {
    static sanitize = (str = '', key) => {
        try {
            return str.replace(/'/g, "''").replace(/\(/g, '⎛').replace(/\)/g, '⎞');
        } catch (e) {
            console.error(key, str, e.message);
            return 'invalid';
        }
    }
    static build = async ({id, url}) => {
        try {
            const feed = await parser.parseURL(url);
            const posts = await feed.items.map(item => {
                delete item['content:encoded'];
                delete item['content:encodedSnippet'];

                return {
                    ...item,
                    pubDate: new Date(item.pubDate).valueOf(),
                };
            });
            return posts.map(({link, title, pubDate, content}) => {
                const query = `('${ParsedFeed.sanitize(link, 'link')}', '${ParsedFeed.sanitize(title, 'title')}', '${ParsedFeed.sanitize(pubDate.toString(), 'pubDate')}',  ${Number(id)}, '${ParsedFeed.sanitize(content, 'content')}')`
                return query;
            });
        } catch (e) {
            console.error('f', e.message)
        }
    }
}

export class Feed {
    static add = (url) => {
        if (url) db.run(`INSERT INTO feeds (url) VALUES('${url}');`, (e) => {
            if (e) handle(e);

            console.log(`${url} added to feeds`)
            process.exit();
        })
    }

    static getAll = (cb) => {
        db.all(`SELECT * FROM feeds`, (e, rows) => {
            if (e) handle(e);
            if (cb) cb(rows);
        })
    }
    static build = () => {
        Feed.getAll(async (rows) => {
            let values = await Promise.all(rows.map(row => {
                return ParsedFeed.build(row)
            }));
            let feed = [...values].filter(value => {
                return Boolean(value) && value.length > 0;
            }).join(',\n')
            const query = `INSERT or IGNORE INTO posts (link, title, pubDate, feed_id, description) VALUES ${feed};`;
            console.log(JSON.stringify(query, null, 2))
            db.run(query, (e) => {
                if (e) return handle(e);
                console.log(`${values.length} added`)
            });
        })
    }
}
