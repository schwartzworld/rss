import express from 'express';
import path from 'path';
import {db, getSources, sources} from "../index.mjs";
import {Feed} from "./models/Feed.mjs";
import {Post} from "./models/Post.mjs";

const app = express()
const port = 3001;

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    res.set('Cache-Control', 'no-store')
    const {posts, previous, next} = await Post.getNew(req.query.page)
    res.render('index', {
        sources,
        posts,
        previous,
        next
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
            const preview = Post.getImage(post.description);
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

app.get('/downvoted', (req, res) => {
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

app.get('/liked', (req, res) => {
    let page = req.query.page || 1;
    let limit = 10;
    const offset = page > 1 ? ` OFFSET ${page * limit}` :''
    db.all(`select * from posts where hidden=2 ORDER BY pubDate DESC LIMIT ${limit}${offset};`, (e, posts) => {
        if (e) return console.error(e.message);

        res.render('hidden', {
            posts,
            previous: `/?page=${Math.max(Number(page) - 1, 1)}`,
            next: `/?page=${Number(page) + 1}`,
        })
    })
});

app.post('/hide/:id', async (req, res) => {
    const { id } = req.params;
    await Post.hide(id);
    res.end('honky dokey')
})

app.post('/like/:id', async (req, res) => {
    const { id } = req.params;
    await Post.like(id);
    res.end('honky dokey')
})

app.post('/unhide/:id', async (req, res) => {
    const { id } = req.params;
    await Post.unhide(id)
    res.end('honky dokey')
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

app.post('/feeds', async(req, res) => {
    const { name } = req.body;
        try {
            await Feed.add(name);
            await Feed.build();
            res.redirect('/feeds')
        } catch (e) {
            res.end(e.message);
        }
});

app.post('/build', async (req, res) => {
    await Feed.build();
    res.redirect('/dashboard');
});

app.delete('/feeds/:id', async (req, res) => {
    const { id } = req.params;
    await Feed.delete(id);
    res.redirect('/feeds')
});
