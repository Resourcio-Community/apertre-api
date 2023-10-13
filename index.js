const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./db/connect')

const PRroute = require('./router/PR.route')

require('dotenv').config()

const app = express()

mongoose.set('strictQuery', true)
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('tiny'))


app.use('/api/v1', PRroute)


const port = process.env.PORT || 3000
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`SERVER PORT : ${port}`)
    })
})
