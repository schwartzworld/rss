import {createTable, dropTable} from "./createTable.mjs";
import {db} from "../index.mjs";
import {addRow} from "./addRow.mjs";
import {nap} from "./nap.mjs";
import {sleep} from "./sleep.mjs";
import {serve} from "./serve.mjs";

const getRecord = (args) => db.each(`SELECT * FROM naps`, (e, r) => {
    if (e) return console.error(e);
    console.log(r)
});

export const main = ([command, ...args]) => {
    switch (command) {
        case '--add':
        case '-a':
            addRow(args);
            break;
        case '--create':
        case '-c':
            createTable(args);
            break;
        case '--drop':
        case '-d':
            dropTable(args);
            break;
        case '--nap':
        case '-n':
            nap.add(args);
            break;
        case '--sleep':
        case '-s':
            sleep.add(args);
            break;
        case '--endnap':
        case '-en':
            nap.end(args);
            break;
        case '--endsleep':
        case '-es':
            sleep.end(args);
            break;
        case '--get':
        case '-g':
            getRecord(args);
            break;
        case '-rrr':
            dropTable(() => createTable(args));
            break;
        case '--sleeps':
            sleep.all();
            break;
        case '--serve':
            serve();
            break;
        case '--naps':
        default:
            nap.all();
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
