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


const router = express.Router()

router.get('/', (req, res) => res.json('Apertre Server 🚀'))

router.use('/v1', v1Router)
router.use('/v2', v2Router)


app.use('/api/', router)

connectDB()
    .then(() => {
        app.listen(8080, () => {
            console.log(`SERVER PORT -> 8080`)
        })
    })
    .catch((err) => console.log(err))

export const handler = serverless(app)
