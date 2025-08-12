const express = require('express')
const app = express()
const port = 3000;

require('dotenv').config()

app.use(express.json())

app.get('/', async (req, res) => {
    const query = req?.query?.q || ''
    const llm = await import('./llm_res.mts')
    
    res.json({
        res: await llm.askAQuestion(req?.query?.q || '')
    })
})

app.listen(port, () => {
    console.log(`Started app on port ${port}`)
})
