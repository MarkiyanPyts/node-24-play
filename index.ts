require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;


console.log('env', process.env.OPENAI_API_KEY)


app.use(express.json())

app.get('/', async (req, res) => {
    const query = req.query.q;
    console.log('query', query)
    const {historyTutor, run} = await import('./agent.mts')
    const result = await run(historyTutor, query, {
        stream: true
    })

    // const streamResult = result.toTextStream({compatibleWithNodeStreams: true})
    // .pipe(process.stdout);
  
    const streamResult = result.toTextStream({compatibleWithNodeStreams: true});
    res.setHeader('Content-Type', 'text/plain');
    streamResult.pipe(res);
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