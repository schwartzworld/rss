import {db} from "../index.mjs";
import {getAll} from "./main.mjs";

export const addNap = ([kidName]) => {
    if (kidName.toLowerCase() === 'sanahin') {
        db.run(`INSERT INTO naps (kid_id) VALUES(2)`, (e) => {
            if (e) console.error(e.message);
            console.log('good' + kidName)
        })
    } else if (kidName.toLowerCase() === 'tvene') {
        db.run(`INSERT INTO naps (kid_id) VALUES(1)`, (e) => {
            if (e) console.error(e.message);
            console.log('good' + kidName)
        })
    }
}


export const endNap = ([kidName]) => {
    db.all(`select n.id, k.name, n.start_time, n.end_time from kids k inner join naps n on k.id=n.kid_id where n.end_time is NULL`, (e, rows) => {
        const nap = rows.find(row => row.name === kidName)
        console.log({nap, kidName, rows})
        if (nap) db.run(`UPDATE naps SET end_time=CURRENT_TIMESTAMP where id='${nap.id}'`, (e) =>{
            if (e) console.error(e.message);
        })
    })
}
