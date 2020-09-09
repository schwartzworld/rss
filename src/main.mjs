import {createTable, dropTable} from "./createTable.mjs";
import {db} from "../index.mjs";
import {serve} from "./serve.mjs";
import {Feed} from "./models/Feed.mjs";

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
            Feed.add(...args)
            break;
        case '--build':
        case '-b':
            Feed.build(...args)
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
