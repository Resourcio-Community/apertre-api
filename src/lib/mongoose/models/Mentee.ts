import mongoose from 'mongoose'

import { MenteeQuestions } from '../../../utils/Questions.js'

const menteeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: 'Prefer not to say'
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    collegeOrOrg: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    isFirstTime: {
        type: Boolean,
        required: true
    },
    question: {
        type: String,
        default: MenteeQuestions.question
    },
    answer: {
        type: String,
        required: true
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.createdAt
                delete ret.updatedAt
                delete ret.__v
            }
        },
        timestamps: true,
    }
)

const Mentee = mongoose.models.Mentee || mongoose.model('Mentee', menteeSchema)
export default Mentee