import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { connectDB } from './db/connect.js'
import { prRoute } from './router/PR.route.js'
import { mentorRoute } from './router/mentor.route.js'
import { menteeRoute } from './router/mentee.route.js'
import { repoRoute } from './router/repo.route.js'

dotenv.config()

const app = express()

mongoose.set('strictQuery', true)
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('tiny'))


app.use('/api/v1/mentor', mentorRoute)
app.use('/api/v1/mentee', menteeRoute)
app.use('/api/v1/repo', repoRoute)
app.use('/api/v1/pr', prRoute)


const port = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`SERVER PORT : ${port}`)
    })
})
