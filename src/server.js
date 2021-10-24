import express from 'express'
import cors from 'cors'
import { corsOptions } from '*/config/cors'
import { connectDB, getDB } from '*/config/mongodb'
import { env } from '*/config/environtment'
import { BoardModel } from '*/models/board.model'
import { apiv1 } from '*/routes/v1/'

connectDB()
    .then(() => console.log('Connected successfully to database server!'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit(1)//Stop app
    })

const bootServer = () => {
    const app = express()

    app.use(cors(corsOptions))

    //Enable request body data
    app.use(express.json())

    //Use api v1
    app.use('/v1', apiv1)

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Trello clone app, running at port http://${env.APP_HOST}:${env.APP_PORT}/`)
    })
}