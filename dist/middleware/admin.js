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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = isAdmin;
const Response_1 = require("../utils/Response");
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Add admin username & password in the headers
        // headers: {
        //     username: admin_username
        //     password: admin_password
        // }
        const { username, password } = req.headers;
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            next();
        }
        else {
            return res.status(401).json((0, Response_1.ApertreResponse)({
                isSuccess: false,
                message: 'Not authorized'
            }));
        }
    });
}
