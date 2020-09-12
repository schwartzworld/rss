import express from 'express';
import path from 'path';
import {db, getSources, sources} from "../index.mjs";
import {getImage} from "./util.mjs";

const app = express()
const port = 3001;

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store')
    let page = req.query.page || 1;
    let limit = 10;
    const offset = page > 1 ? ` OFFSET ${page * limit}` :''
    db.all(`select * from posts where hidden=0 ORDER BY pubDate DESC LIMIT ${limit}${offset};`, (e, posts) => {
        if (e) return console.error(e.message);
        posts.forEach(post => {
            const preview = getImage(post.description);
            if (preview) post.preview = preview;
        })

        res.render('index', {
            posts,
            sources,
            previous: `/?page=${Math.max(Number(page) - 1, 1)}`,
            next: `/?page=${Number(page) + 1}`,
        })
    })
});

app.get('/sources/:source', (req, res) => {
    let feedId = req.params.source;
    let page = req.query.page || 1;
    let limit = 10;
    const offset = page > 1 ? ` OFFSET ${page * limit}` :''
    db.all(`select * from posts where hidden=0 AND feed_id=${feedId} ORDER BY pubDate DESC LIMIT ${limit}${offset};`, (e, posts) => {
        if (e) return console.error(e.message);
        posts.forEach(post => {
            const preview = getImage(post.description);
            if (preview) post.preview = preview;
        })
        res.render('sources', {
            posts,
            sources,
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


app.get('/feeds', (req, res) => {
    res.render('dashboard', {
        sources,
    })
});

app.post('/feeds', (req, res) => {
    const { name } = req.body;
    if (name.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
        db.run(`insert into feeds (url) values('${name}')`, (e) => {
            if (e) return console.error(e.message);
            getSources(() => {
                res.redirect('/feeds')
            });
        })
    } else {
        res.end('no good');
    }
});

app.delete('/feeds/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM feeds WHERE id=${id};`, (e) => {
        if (e) console.error(e.message);
        getSources(() => {
            res.redirect('/feeds')
        });
    });
});
