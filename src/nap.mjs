import {db} from "../index.mjs";
import {findKidInResource} from "./util.mjs";

export const add = ([kidName, difficulty = 0, timestamp, car = false]) => {
    if (kidName.toLowerCase() === 'sanahin') {
        db.run(`INSERT INTO naps (kid_id, difficulty, start_time, car) VALUES(2, ${difficulty}, ${timestamp ? Number(timestamp) : 'CURRENT_TIMESTAMP'}, ${car})`, (e) => {
            if (e) console.error(e.message);
            console.log('Added nap for ' + kidName)
        })
    } else if (kidName.toLowerCase() === 'tvene') {
        db.run(`INSERT INTO naps (kid_id, difficulty) VALUES(1, ${difficulty})`, (e) => {
            if (e) console.error(e.message);
            console.log('Added nap for ' + kidName)
        })
    }
}


export const end = ([kidName, wakeup = 0]) => {
    db.all(`select n.id, k.name, n.start_time, n.end_time from kids k inner join naps n on k.id=n.kid_id where n.end_time is NULL`, (e, rows) => {
        const nap = rows.find(() => findKidInResource(kidName))
        if (nap) db.run(`UPDATE naps SET end_time=CURRENT_TIMESTAMP, wakeup=${wakeup} where id='${nap.id}'`, (e) =>{
            if (e) console.error(e.message);
            console.log(`Ended nap with id ${nap.id} for ${kidName}`)
        })
    })
}


export const all = () => {
    let query = `select k.name, n.start_time, n.end_time, n.difficulty, car, wakeup from kids k inner join naps n on k.id=n.kid_id`;

    db.all(query, (e, rows) => {
        if (e) console.error(e.message)
        return rows.forEach(r => console.log(r))
    });

}

export const nap = {
    add, end, all
}
