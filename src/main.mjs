import {createTable, dropTable} from "./createTable.mjs";
import {db} from "../index.mjs";
import {addRow} from "./addRow.mjs";
import {addNap, endNap} from "./addNap.mjs";

const getRecord = (args) => db.each(`SELECT * FROM naps`, (e, r) => {
    if (e) return console.error(e);
    console.log(r)
});

export const getAll = () => {
    let query = `select k.name, n.start_time, n.end_time from kids k inner join naps n on k.id=n.kid_id`;

    db.all(query, (e, rows) => {
        rows.forEach(r => console.log(r))
    });

}

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
            addNap(args);
            break;
        case '--endnap':
        case '-en':
            endNap(args);
            break;
        case '--get':
        case '-g':
            getRecord(args);
            break;

        case '-rrr':
            dropTable(() => createTable(args));

            break;
        default:
            getAll();
    }

    /*
    console.log({a, b})
    if (p.length > 0) {
        db.run(`INSERT INTO langs(name) VALUES ${p.map(q => '(?)').join(',')}`, p);
    }*/


    /*db.serialize(() => {
        db.each('select * from langs', function (e, r) {
            if (e) throw e;
            console.log(r)
        })
    })*/

    db.close(e => {
        if (e) console.error(e.message);
        console.log('Closed')
    });

}
