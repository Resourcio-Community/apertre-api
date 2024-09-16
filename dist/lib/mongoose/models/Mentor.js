"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Questions_js_1 = require("../../../utils/Questions.js");
const mentorSchema = new mongoose_1.default.Schema({
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
    whatsapp: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    year: {
        type: Number,
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
    projectName: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true
    },
    projectTags: {
        type: [String],
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    question1: {
        type: String,
        default: Questions_js_1.MentorQuestions.question1
    },
    answer1: {
        type: String,
        required: true
    },
    question2: {
        type: String,
        default: Questions_js_1.MentorQuestions.question2
    },
    answer2: {
        type: String,
        required: true
    },
    isSelected: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    },
    timestamps: true,
});
const Mentor = mongoose_1.default.models.Mentor || mongoose_1.default.model('Mentor', mentorSchema);
exports.default = Mentor;
