import mongoose from 'mongoose'

export async function connectDB() {

    mongoose.set('strictQuery', true)

    if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL")

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)

        console.log(`MongoDB : ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
    }
}
