import dotenv from 'dotenv'
import { Response } from '../utils/Response.js'

dotenv.config()

export const isAdmin = async (req, res, next) => {
    // Add admin username & password in the headers
    // headers: {
    //     username: admin_username
    //     password: admin_password
    // }

    const HEADER_ADMIN_USERNAME = req.headers.username || ''
    const HEADER_ADMIN_PASSWORD = req.headers.password || ''

    if (HEADER_ADMIN_USERNAME === process.env.ADMIN_USERNAME && HEADER_ADMIN_PASSWORD === process.env.ADMIN_PASSWORD) {
        next()
    }
    else {
        return res.status(401).json(Response({ isSuccess: false, message: 'Not authorized' }))
    }
}