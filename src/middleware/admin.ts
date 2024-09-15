import { NextFunction, Request, Response } from 'express'
import { ApertreResponse } from '../utils/Response'


export async function isAdmin(req: Request, res: Response, next: NextFunction) {
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
        return res.status(401).json(ApertreResponse({
            isSuccess: false,
            message: 'Not authorized'
        }))
    }
}
