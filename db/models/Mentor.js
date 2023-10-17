import mongoose from 'mongoose'

import { MentorQuestions } from '../../utils/Questions.js'

const mentorSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        gender: { type: String, default: 'Prefer not to say' },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        whatsapp: { type: String, required: true },
        college: { type: String, required: true },
        year: { type: Number, required: true },
        github: { type: String, required: true },
        linkedIn: { type: String, required: true },
        projectName: { type: String, required: true },
        projectLink: { type: String, required: true },
        projectTags: { type: [String], required: true },
        projectDescription: { type: String, required: true },
        question1: { type: String, default: MentorQuestions.question1 },
        answer1: { type: String, required: true },
        question2: { type: String, default: MentorQuestions.question2 },
        answer2: { type: String, required: true },
        isSelected: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
)

const Mentor = mongoose.model('Mentor', mentorSchema)

export default Mentor