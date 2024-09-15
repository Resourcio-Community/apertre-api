import { Response } from '../utils/Response.js'

export const isAdmin = async (req, res, next) => {
    // Add admin username & password in the headers
    // headers: {
    //     username: admin_username
    //     password: admin_password
    // }

    const { username, password } = req.headers

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        next()
    }
    else {
        return res.status(401).json(Response({ isSuccess: false, message: 'Not authorized' }))
    }
}