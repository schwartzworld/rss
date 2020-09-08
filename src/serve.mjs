import express from 'express';
import {db} from "../index.mjs";

const app = express()
const port = 3000

app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let page = req.query.page || 1;
    let limit = 10;
    const offset = page > 1 ? ` OFFSET ${page * limit}` :''
    db.all(`select * from posts ORDER BY pubDate DESC LIMIT ${limit}${offset};`, (e, posts) => {
        if (e) return console.error(e.message);

        res.render('index', {
            posts,
            previous: `/?page=${Math.max(Number(page) - 1, 1)}`,
            next: `/?page=${Number(page) + 1}`,
        })
    })
})
export const serve = () => {
    app.listen(port, () => {
        console.log(`Serving up the RSS Reader on ${port}`)
    })
}
