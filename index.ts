const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/:id', (req, res) => {
    console.log(req.params)
    res.json({
        ...req.params
    })
})

app.get('/', (req, res) => {
    console.log(req.params)
    res.json({
        ...req.params
    })
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})