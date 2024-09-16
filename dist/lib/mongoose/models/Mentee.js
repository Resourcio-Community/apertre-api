"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Questions_js_1 = require("../../../utils/Questions.js");
const menteeSchema = new mongoose_1.default.Schema({
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
        default: Questions_js_1.MenteeQuestions.question
    },
    answer: {
        type: String,
        required: true
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
const Mentee = mongoose_1.default.models.Mentee || mongoose_1.default.model('Mentee', menteeSchema);
exports.default = Mentee;
