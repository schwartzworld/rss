import sqlite3 from 'sqlite3'
import {main} from "./src/main.mjs";
import {Feed} from "./src/models/Feed.mjs";

const s = sqlite3.verbose();
const [a, b, ...rest] = process.argv;
export let sources = [];

let buildTimer;
export const db = new s.Database('./feeds.db', (err) => {
	if (err) return console.error(err.message);
	Feed.build().then(() => {
		buildTimer = setInterval(Feed.buildIndivdual, 300000);
		getSources(() =>{

			main(rest);
			console.log('Connected')
		});
	});
});

export const getSources = (cb) => {
	db.all(`select * from feeds;`, (e, rows) => {
		if (e) return console.error(e.message);
		sources = rows;
		if (cb) cb();
	})
}
