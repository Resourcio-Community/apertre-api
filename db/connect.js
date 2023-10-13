const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL

module.exports = async function connectDB() {
    try {
        const conn = await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB : ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
    }
}
