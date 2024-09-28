"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1GetTechStacks = exports.v1GetRepos = exports.v1GetMentors = exports.v1GetMentor = exports.v1AddMentor = exports.v1GetMentees = exports.v1GetMentee = exports.v1AddMentee = void 0;
const mentee_controller_1 = require("./mentee.controller");
Object.defineProperty(exports, "v1AddMentee", { enumerable: true, get: function () { return mentee_controller_1.addMentee; } });
Object.defineProperty(exports, "v1GetMentee", { enumerable: true, get: function () { return mentee_controller_1.getMentee; } });
Object.defineProperty(exports, "v1GetMentees", { enumerable: true, get: function () { return mentee_controller_1.getMentees; } });
const mentor_controller_1 = require("./mentor.controller");
Object.defineProperty(exports, "v1AddMentor", { enumerable: true, get: function () { return mentor_controller_1.addMentor; } });
Object.defineProperty(exports, "v1GetMentor", { enumerable: true, get: function () { return mentor_controller_1.getMentor; } });
Object.defineProperty(exports, "v1GetMentors", { enumerable: true, get: function () { return mentor_controller_1.getMentors; } });
const repo_controller_1 = require("./repo.controller");
Object.defineProperty(exports, "v1GetRepos", { enumerable: true, get: function () { return repo_controller_1.getRepos; } });
Object.defineProperty(exports, "v1GetTechStacks", { enumerable: true, get: function () { return repo_controller_1.getUniqueTechStacks; } });