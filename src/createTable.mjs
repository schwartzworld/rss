import {db} from "../index.mjs";

export const createTable = ([tableName, ...args]) => {
    db.run(`CREATE TABLE feeds (
        id INTEGER PRIMARY KEY,
        url STRING NOT NULL
        
);`)
}

export const dropTable = (cb) => {
   db.run(`DROP TABLE feeds;`, (e) => {
       if (e) return console.error(e);
       console.log('Dropped nap table')
       if (typeof cb === 'function') cb();
   })
}
