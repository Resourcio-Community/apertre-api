import { Request, Response } from "express"
import { ApertreResponse } from "../../utils/Response"
import { sendMail } from "../../utils/mail"
import Mentor from "../../lib/mongoose/models/Mentor"
import Mentee from "../../lib/mongoose/models/Mentee"


export async function addMentor(req: Request, res: Response) {
    const details = req.body

    try {
        // Checking if the email already exists in mentee's collection
        const existingMentee = await Mentee.findOne({ email: details.email })

        if (existingMentee)
            return res.status(409).json(
                ApertreResponse({
                    isSuccess: false,
                    message: 'You have already registered as a Mentee'
                })
            )

        // Creating a new mentor
        await Mentor.create(details)
        sendMail(details.name, details.email, false)

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: 'You have been registered successfully as a mentor, please check your email(also spam)'
            })
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(
            ApertreResponse({
                isSuccess: false,
                message: 'Something went wrong, please try again'
            })
        )
    }
}

export async function getMentors(req: Request, res: Response) {
    try {
        const mentors = await Mentor.find().sort({ _id: -1 })

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: 'Data for all mentors has been fetched',
                data: mentors
            })
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(
            ApertreResponse({
                isSuccess: false,
                message: 'Something went wrong'
            })
        )
    }
}

export async function getMentor(req: Request, res: Response) {
    const { email } = req.params

    try {
        const mentor = await Mentor.findOne({ email })

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: 'Mentor data has been fetched',
                data: mentor
            })
        )
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(
            ApertreResponse({
                isSuccess: false,
                message: 'Something went wrong'
            })
        )
    }
}
