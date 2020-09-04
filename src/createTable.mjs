import {db} from "../index.mjs";

export const createTable = ([tableName, ...args]) => {
    db.run(`CREATE TABLE sleeps (
        id INTEGER PRIMARY KEY,
        kid_id INTEGER NOT NULL,
        start_time INT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        end_time INTEGER,
        difficulty INTEGER
);`)
}

export const dropTable = (cb) => {
   db.run(`DROP TABLE sleeps;`, (e) => {
       if (e) return console.error(e);
       console.log('Dropped nap table')
       if (typeof cb === 'function') cb();
   })
}
