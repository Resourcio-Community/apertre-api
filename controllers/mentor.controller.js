import Mentee from "../db/models/Mentee.js"
import Mentor from "../db/models/Mentor.js"
import { Response } from "../utils/Response.js"
import { sendMail } from "../utils/mail.js"

export const addMentor = async (req, res) => {
    const details = req.body

    try {
        // Checking if the email already exists in mentee's collection
        const existingMentee = await Mentee.findOne({ email: details.email })
        if (existingMentee)
            return res.status(409).json(Response({ isSuccess: false, message: 'You have already registered as a Mentee' }))

        // Creating a new mentor
        await Mentor.create(details)
        // sendMentorMail(details.email, details.name, details.projectName, details.projectLink)
        sendMail(details.name, details.email, false)

        return res.status(200).json(
            Response({
                isSuccess: true,
                message: 'You have been registered successfully as a mentor, please check your email(also spam)'
            })
        )
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json(Response({ isSuccess: false, message: 'Something went wrong, please try again' }))
    }
}

export const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find().sort({ _id: -1 })
        return res.status(200).json(
            Response({
                isSuccess: true,
                message: 'Data for all mentors has been fetched',
                data: mentors
            })
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(Response({ isSuccess: false, message: 'Something went wrong' }))
    }
}

export const getMentor = async (req, res) => {
    const { email } = req.params
    try {
        const mentor = await Mentor.findOne({ email })
        return res.status(200).json(
            Response({
                isSuccess: true,
                message: 'Mentor data has been fetched',
                data: mentor
            })
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(Response({ isSuccess: false, message: 'Something went wrong' }))
    }
}