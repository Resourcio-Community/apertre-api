import mongoose from 'mongoose'

import { MenteeQuestions } from '../../utils/Questions.js'

const menteeSchema = mongoose.Schema(
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
        isFirstTime: { type: Boolean, required: true },
        question: { type: String, default: MenteeQuestions.question },
        answer: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

const Mentee = mongoose.model('Mentee', menteeSchema)

export default Mentee