import mongoose from 'mongoose'

const repoSchema = new mongoose.Schema({
    maintainer: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true
    },
    projectDesc: {
        type: String,
        required: true
    },
    projectDomain: {
        type: String,
        enum: [
            'Web Development',
            'Android Development',
            'AI/ML',
            'Cyber Security',
            'Web3 & Blockchain',
            'Web + Flutter'
        ]
    },
    techStack: {
        type: [String],
        required: true
    },
    address: {
        type: String
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

const Repo = mongoose.models.Repo || mongoose.model("Repo", repoSchema)
export default Repo