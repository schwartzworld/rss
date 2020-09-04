import express from 'express';

const app = express()
const port = 3000

app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})
export const serve = () => {
    app.listen(port, () => {
        console.log(`Serving up the RSS Reader on ${port}`)
    })
}
