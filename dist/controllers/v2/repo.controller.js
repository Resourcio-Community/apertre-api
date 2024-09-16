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
exports.getRepos = getRepos;
exports.getUniqueTechStacks = getUniqueTechStacks;
const Response_1 = require("../../utils/Response");
const config_1 = require("../../lib/config");
function getRepos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const limit = req.query.limit;
        //@ts-ignore
        const page = req.query.page;
        try {
            const repos = yield config_1.db.repo.findMany();
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: "Repos have been fetched.",
                data: repos
            }));
        }
        catch (err) {
            console.log(err);
            return res.status(500).json((0, Response_1.ApertreResponse)({
                isSuccess: false,
                message: "Something went wrong"
            }));
        }
    });
}
function getUniqueTechStacks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repos = yield config_1.db.repo.findMany({
                select: {
                    techStack: true
                }
            });
            let techStacks = [];
            repos.forEach((repo) => {
                techStacks = techStacks.concat(repo.techStack);
            });
            return res.status(200).json((0, Response_1.ApertreResponse)({
                isSuccess: true,
                message: "Tech stacks have been fetched.",
                data: [...new Set(techStacks)]
            }));
        }
        catch (err) {
            console.log(err);
            return res.status(500).json((0, Response_1.ApertreResponse)({
                isSuccess: false,
                message: "Something went wrong"
            }));
        }
    });
}
