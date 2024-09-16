"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMentor = addMentor;
exports.getMentors = getMentors;
exports.getMentor = getMentor;
const Response_1 = require("../../utils/Response");
const mail_1 = require("../../utils/mail");
const Mentor_1 = __importDefault(require("../../lib/mongoose/models/Mentor"));
const Mentee_1 = __importDefault(require("../../lib/mongoose/models/Mentee"));
function addMentor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = req.body;
        try {
            // Checking if the email already exists in mentee's collection
            const existingMentee = yield Mentee_1.default.findOne({ email: details.email });
            if (existingMentee)
                return res.status(409).json((0, Response_1.ApertreResponse)({
                    isSuccess: false,
                    message: 'You have already registered as a Mentee'
                }));
            // Creating a new mentor
            yield Mentor_1.default.create(details);
            (0, mail_1.sendMail)(details.name, details.email, false);
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: 'You have been registered successfully as a mentor, please check your email(also spam)'
            }));
        }
        catch (err) {
            console.log(err);
            return res.status(500).json((0, Response_1.ApertreResponse)({
                isSuccess: false,
                message: 'Something went wrong, please try again'
            }));
        }
    });
}
function getMentors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentors = yield Mentor_1.default.find().sort({ _id: -1 });
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: 'Data for all mentors has been fetched',
                data: mentors
            }));
        }
        catch (err) {
            console.log(err);
            return res.status(500).json((0, Response_1.ApertreResponse)({
                isSuccess: false,
                message: 'Something went wrong'
            }));
        }
    });
}
function getMentor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.params;
        try {
            const mentor = yield Mentor_1.default.findOne({ email });
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: 'Mentor data has been fetched',
                data: mentor
            }));
        }
        catch (err) {
            console.log(err);
            return res.status(500).json((0, Response_1.ApertreResponse)({
                isSuccess: false,
                message: 'Something went wrong'
            }));
        }
    });
}
