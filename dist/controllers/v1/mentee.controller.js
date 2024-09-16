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
exports.addMentee = addMentee;
exports.getMentees = getMentees;
exports.getMentee = getMentee;
const Response_1 = require("../../utils/Response");
const mail_1 = require("../../utils/mail");
const Mentee_1 = __importDefault(require("../../lib/mongoose/models/Mentee"));
const Mentor_1 = __importDefault(require("../../lib/mongoose/models/Mentor"));
function addMentee(req, res) {
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
            // Checking if the email already exists in mentor's collection
            const existingMentor = yield Mentor_1.default.findOne({ email: details.email });
            if (existingMentor)
                return res.status(409).json((0, Response_1.ApertreResponse)({
                    isSuccess: false,
                    message: 'You have already registered as a Mentor'
                }));
            // Creating a new mentee
            yield Mentee_1.default.create(details);
            // sendMenteeMail(details.name, details.email)
            (0, mail_1.sendMail)(details.name, details.email);
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: 'You have been registered successfully as a mentee! Please check your email(also spam)',
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
function getMentees(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentees = yield Mentee_1.default.find().select('-question');
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: 'Data for all mentees has been fetched',
                data: mentees
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
function getMentee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.params;
        try {
            const mentee = yield Mentee_1.default.findOne({ email });
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: 'Mentee data has been fetched',
                data: mentee
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
