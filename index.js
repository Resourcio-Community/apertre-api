import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { connectDB } from './db/connect.js'
import { PRroute } from './router/PR.route.js'

dotenv.config()

const app = express()

mongoose.set('strictQuery', true)
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('tiny'))


app.use('/api/v1/register', PRroute)
app.use('/api/v1/pr', PRroute)


const port = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`SERVER PORT : ${port}`)
    })
})
