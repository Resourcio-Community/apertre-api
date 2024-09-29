import { Request, Response } from "express"
import { ApertreResponse } from "../../utils/Response"
// import { sendMail } from "../../utils/mail"
import Mentee from "../../lib/mongoose/models/Mentee"
import Mentor from "../../lib/mongoose/models/Mentor"


export async function addMentee(req: Request, res: Response) {
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

        // Checking if the email already exists in mentor's collection
        const existingMentor = await Mentor.findOne({ email: details.email })
        if (existingMentor)
            return res.status(409).json(
                ApertreResponse({
                    isSuccess: false,
                    message: 'You have already registered as a Mentor'
                })
            )

        // Creating a new mentee
        await Mentee.create(details)
        // sendMenteeMail(details.name, details.email)
        // sendMail(details.name, details.email)

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: 'You have been registered successfully as a mentee! Please check your email(also spam)',
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

export async function getMentees(req: Request, res: Response) {
    try {
        const mentees = await Mentee.find().select('-question')

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: 'Data for all mentees has been fetched',
                data: mentees
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

export async function getMentee(req: Request, res: Response) {
    const { email } = req.params

    try {
        const mentee = await Mentee.findOne({ email })

        return res.status(200).json(
            ApertreResponse({
                isSuccess: true,
                message: 'Mentee data has been fetched',
                data: mentee
            })
        )
    } catch (err) {
        console.log(err)
        return res.status(500).json(
            ApertreResponse({
                isSuccess: false,
                message: 'Something went wrong'
            })
        )
    }
}
