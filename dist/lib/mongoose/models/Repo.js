"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const repoSchema = new mongoose_1.default.Schema({
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
const Repo = mongoose_1.default.models.Repo || mongoose_1.default.model("Repo", repoSchema);
exports.default = Repo;
