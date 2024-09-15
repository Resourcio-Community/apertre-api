import Mentee from "../db/models/Mentee.js"
import Mentor from "../db/models/Mentor.js"
import { Response } from "../utils/Response.js"
import { sendMail } from "../utils/mail.js"

export const addMentee = async (req, res) => {
    const details = req.body

    try {
        // Checking if the email already exists in mentee's collection
        const existingMentee = await Mentee.findOne({ email: details.email })
        if (existingMentee)
            return res.status(409).json(
                Response({
                    isSuccess: false,
                    message: 'You have already registered as a Mentee'
                })
            )

        // Checking if the email already exists in mentor's collection
        const existingMentor = await Mentor.findOne({ email: details.email })
        if (existingMentor)
            return res.status(409).json(
                Response({
                    isSuccess: false,
                    message: 'You have already registered as a Mentor'
                })
            )

        // Creating a new mentee
        await Mentee.create(details)
        // sendMenteeMail(details.name, details.email)
        sendMail(details.name, details.email)

        return res.status(200).json(
            Response({
                isSuccess: true,
                message: 'You have been registered successfully as a mentee! Please check your email(also spam)',
            })
        )
    } catch (err) {
        console.log(err)
        return res.status(500).json(
            Response({
                isSuccess: false,
                message: 'Something went wrong'
            })
        )
    }
}

export const getMentees = async (req, res) => {
    try {
        const mentees = await Mentee.find().select('-question')
        return res.status(200).json(
            Response({
                isSuccess: true,
                message: 'Data for all mentees has been fetched',
                data: mentees
            })
        )
    } catch (err) {
        console.log(err)
        return res.status(500).json(
            Response({
                isSuccess: false,
                message: 'Something went wrong'
            })
        )
    }
}

export const getMentee = async (req, res) => {
    const { email } = req.params

    try {
        const mentee = await Mentee.findOne({ email })
        return res.status(200).json(
            Response({
                isSuccess: true,
                message: 'Mentee data has been fetched',
                data: mentee
            })
        )
    } catch (err) {
        console.log(err)
        return res.status(500).json(
            Response({
                isSuccess: false,
                message: 'Something went wrong'
            })
        )
    }
}
