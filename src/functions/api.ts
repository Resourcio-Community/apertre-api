import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import morgan from 'morgan'
import serverless from 'serverless-http'
import { v1Router, v2Router } from '../router'
import { connectDB } from '../lib/mongoose/connect'

dotenv.config()


const app: Application = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('tiny'))



app.get('/', (req, res) => res.json('Apertre Server 🚀'))

app.use('/api/v1', v1Router)
app.use('/api/v2', v2Router)




const port = process.env.PORT
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`SERVER PORT : ${port}`)
    })
})

export const handler = serverless(app)
