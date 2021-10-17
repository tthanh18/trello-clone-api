import express from 'express'

const app = express()

const hostName = 'localhost'
const port = 8080

app.get('/', (req, res) => {
    res.end('<h1>Hello world</h1>')
})

app.listen(port, hostName, () => {
    console.log(`Trello clone app, running at port ${hostName}:${port}/`)
})