import sqlite3 from 'sqlite3'
import {main} from "./src/main.mjs";

const s = sqlite3.verbose();
const [a, b, ...rest] = process.argv;

export const db = new s.Database('./feeds.db', (err) => {
	if (err) return console.error(err.message);
	main(rest);
	console.log('Connected')
});
