import express from 'express';
import {nap} from "./nap.mjs";

const app = express()
const port = 3000

app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/nap', (req, res) => {
    res.render('nap');
})

app.post('/nap', (req, res) => {
    console.log(req.body)
    return res.end()
})

export const serve = () => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}
