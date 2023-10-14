import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL

export async function connectDB() {
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
