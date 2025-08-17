const express = require('express')
const app = express()
const port = 3000;
const db = require('./db.ts')

require('dotenv').config()

app.use(express.json())

app.get('/', async (req, res) => {
    const query = req?.query?.q || ''
    const llm = await import('./llm_res.mts')
    
    res.json({
        res: await llm.askAQuestion(req?.query?.q || '')
    })
})

app.post('/write', async (req, res) => {
    const data = req.body
    // Handle the data writing logic here
    try {
        await db.query('INSERT INTO messages (type, message) VALUES ($1, $2)', [data.type, data.message])
        res.json({ status: 'success', data })
    } catch (error) {
        console.error('Error inserting data:', error)
        res.status(500).json({ status: 'error', error: 'Failed to insert data' })
    }
})

app.listen(port, () => {
    console.log(`Started app on port ${port}`)
})
