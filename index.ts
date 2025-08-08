const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/:id', (req, res) => {
    const params = {
        ...req.params
    }
    res.json(params);
})

app.post('/add', (req, res) => {
    const body = req.body
    console.log(body)
    res.json({
        'rer': 5
    })
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})