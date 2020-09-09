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
    db.all(`select * from posts where hidden=0 ORDER BY pubDate DESC LIMIT ${limit}${offset};`, (e, posts) => {
        if (e) return console.error(e.message);

        res.render('index', {
            posts,
            previous: `/?page=${Math.max(Number(page) - 1, 1)}`,
            next: `/?page=${Number(page) + 1}`,
        })
    })
});

app.get('/hidden', (req, res) => {
    let page = req.query.page || 1;
    let limit = 10;
    const offset = page > 1 ? ` OFFSET ${page * limit}` :''
    db.all(`select * from posts where hidden=1 ORDER BY pubDate DESC LIMIT ${limit}${offset};`, (e, posts) => {
        if (e) return console.error(e.message);

        res.render('hidden', {
            posts,
            previous: `/?page=${Math.max(Number(page) - 1, 1)}`,
            next: `/?page=${Number(page) + 1}`,
        })
    })
});

app.post('/hide/:id', (req, res) => {
    const { id } = req.params;
    db.run(`UPDATE posts SET hidden=1 WHERE id=${id}`, (e) => {
        if (e) return console.error(e.message);
        res.end('honky dokey')
    })
})

app.post('/unhide/:id', (req, res) => {
    const { id } = req.params;
    db.run(`UPDATE posts SET hidden=0 WHERE id=${id}`, (e) => {
        if (e) return console.error(e.message);
        res.end('honky dokey')
    })
})

export const serve = () => {
    app.listen(port, () => {
        console.log(`Serving up the RSS Reader on ${port}`)
    })
}
