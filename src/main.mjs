import Parser from 'rss-parser';
import {createTable, dropTable} from "./createTable.mjs";
import {db} from "../index.mjs";
import {serve} from "./serve.mjs";

const parser = new Parser();

const handle = (error) => {
    console.log(error.message);
    process.exit();
};

class Feeds {
    static add = (url) => {
        if (url) db.run(`INSERT INTO feeds (url) VALUES('${url}');`, (e) => {
            if (e) handle(e);

            console.log(`${url} added to feeds`)
            process.exit();
        })
    }

    static getAll = (cb) => {
        db.all(`SELECT url FROM feeds`, (e, rows) => {
            if (e) handle(e);
            if (cb) cb(rows.map(row => row.url));
        })
    }
    static build = () => {
        Feeds.getAll(async (rows) => {
            let feed = await parser.parseURL(rows[2]);
            const query = feed.items.map(({link, pubDate, title, contentSnippet, ...rest}) => {
                const fullContent = rest['content:encoded'];
                return `INSERT INTO posts (`
            });
            console.log({query})
            process.exit();
        })
    }
}
/*
id INTEGER PRIMARY KEY,
        link STRING NOT NULL UNIQUE,
        title STRING NOT NULL,
        description STRING,
        published STRING,
        content STRING
 */

export const main = ([command, ...args]) => {
    switch (command) {
        case '--add':
        case '-a':
            Feeds.add(...args)
            break;
        case '--build':
        case '-b':
            Feeds.build(...args)
            break;
        case '--create':
        case '-c':
            createTable(args);
            break;
        case '--drop':
        case '-d':
            dropTable(args);
            break;
        case '-rrr':
            dropTable(() => createTable(args));
            break;
        default:
            serve();
    }

    process.stdin.resume();//so the program will not close instantly

    function exitHandler(options, exitCode) {
        console.log(options, exitCode)
        db.close(e => {
            if (e) console.error('error: ' + e.message);
            if (options.cleanup) console.log('clean');
            if (exitCode || exitCode === 0) console.log(exitCode);
            if (options.exit) process.exit();
            console.log('Closed')
        });
    }

//do something when app is closing
    process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
    process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

}
