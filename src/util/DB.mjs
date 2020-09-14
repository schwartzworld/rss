import {db} from "../../index.mjs";

export class DB {
    static all = (query) => {
        return new Promise((resolve, reject) => {
            db.all(query, (e, data) => {
                if (e) reject(e);
                resolve(data);
            })
        })
    }
    static run = (query) => {
        return new Promise((resolve, reject) => {
            db.run(query, (e, data) => {
                if (e) reject(e);
                resolve(data);
            })
        })
    }
}
