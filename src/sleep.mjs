import {db} from "../index.mjs";
import {findKidInResource} from "./util.mjs";

export const add = ([kidName, difficulty = 0, timestamp]) => {
    if (kidName.toLowerCase() === 'sanahin') {
        db.run(`INSERT INTO sleeps (kid_id, difficulty, start_time) VALUES(2, ${difficulty}, ${timestamp ? Number(timestamp) : 'CURRENT_TIMESTAMP'})`, (e) => {
            if (e) console.error(e.message);
            console.log('Added nap for ' + kidName)
        })
    } else if (kidName.toLowerCase() === 'tvene') {
        db.run(`INSERT INTO sleeps (kid_id, difficulty, start_time) VALUES(1, ${difficulty}, ${timestamp ? Number(timestamp) : 'CURRENT_TIMESTAMP'})`, (e) => {
            if (e) console.error(e.message);
            console.log('Added nap for ' + kidName)
        })
    }
}


export const end = ([kidName, wakeup = 0]) => {
    db.all(`select n.id, k.name, n.start_time, n.end_time from kids k inner join sleeps n on k.id=n.kid_id where n.end_time is NULL`, (e, rows) => {
        const sleep = rows.find(() => findKidInResource(kidName))
        if (sleep) db.run(`UPDATE naps SET end_time=CURRENT_TIMESTAMP, wakeup=${wakeup} where id='${sleep.id}'`, (e) =>{
            if (e) console.error(e.message);
            console.log(`Ended nap with id ${sleep.id} for ${kidName}`)
        })
    })
}

export const all = () => {
    let query = `select * from sleeps;`;

    db.all(query, (e, rows) => {
        rows.forEach(r => console.log(r))
    });
}
export const sleep  = {
    add, end, all
}
