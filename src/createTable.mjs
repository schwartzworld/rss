import {db} from "../index.mjs";

export const createTable = ([tableName, ...args]) => {
    db.run(`CREATE TABLE naps (
        id INTEGER PRIMARY KEY,
        kid_id INTEGER NOT NULL,
        start_time INT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        end_time INT
);`)
}

export const dropTable = (cb = () => {}) => {
   db.run(`DROP TABLE naps;`, (e) => {
       if (e) return console.error(e);
       console.log('Dropped nap table')
       cb();
   })
}
