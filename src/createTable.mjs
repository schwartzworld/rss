import {db} from "../index.mjs";

export const createTable = ([tableName, ...args]) => {
    db.run(`CREATE TABLE posts (
        id INTEGER PRIMARY KEY,
        link STRING NOT NULL UNIQUE,
        title STRING NOT NULL,
        description STRING,
        pubDate STRING
);`)
}

export const dropTable = (cb) => {
   db.run(`DROP TABLE posts;`, (e) => {
       if (e) return console.error(e);
       console.log('Dropped nap table')
       if (typeof cb === 'function') cb();
   })
}
