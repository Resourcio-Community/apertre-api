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
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
let nodeConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
};
let transporter = nodemailer_1.default.createTransport(nodeConfig);
let MailGenerator = new mailgen_1.default({
    theme: 'default',
    product: {
        name: 'Resourcio Community',
        link: 'https://www.linkedin.com/company/resourcio-community2022/'
    }
});
function sendMail(name_1, email_1) {
    return __awaiter(this, arguments, void 0, function* (name, email, isMentee = true) {
        console.log(isMentee);
        let mail;
        if (isMentee) {
            mail = {
                body: {
                    name: name,
                    signature: false,
                    intro: "Welcome to Apertre | Successfully Registered as Mentee",
                    outro: "Best of Luck from Resourcio Community"
                }
            };
        }
        else {
            mail = {
                body: {
                    name: name,
                    signature: false,
                    intro: "Welcome to JWOC | Successfully Registered as Mentor",
                    outro: "Best of Luck from Resourcio Community"
                }
            };
        }
        var emailBody = MailGenerator.generate(mail);
        let message = {
            from: process.env.EMAIL,
            to: email,
            subject: "Apertre Registration",
            html: emailBody
        };
        transporter.sendMail(message)
            .then((res) => {
            console.log(res);
        })
            .catch((error) => {
            console.log(error);
        });
    });
}
