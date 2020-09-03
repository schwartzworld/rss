import {db} from "../index.mjs";

export const addRow = () => {
    db.run(`INSERT INTO kids (name, birthday) VALUES('Sanahin', 1463281200)`, (e) => {
        if (e) console.error(e.message);
        console.log('good')
    })
}
