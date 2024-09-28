"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2GetTechStacks = exports.v2GetRepos = exports.v2GetMentors = exports.v2GetMentor = exports.v2AddMentor = exports.v2GetMentees = exports.v2GetMentee = exports.v2AddMentee = void 0;
const mentee_controller_1 = require("./mentee.controller");
Object.defineProperty(exports, "v2AddMentee", { enumerable: true, get: function () { return mentee_controller_1.addMentee; } });
Object.defineProperty(exports, "v2GetMentee", { enumerable: true, get: function () { return mentee_controller_1.getMentee; } });
Object.defineProperty(exports, "v2GetMentees", { enumerable: true, get: function () { return mentee_controller_1.getMentees; } });
const mentor_controller_1 = require("./mentor.controller");
Object.defineProperty(exports, "v2AddMentor", { enumerable: true, get: function () { return mentor_controller_1.addMentor; } });
Object.defineProperty(exports, "v2GetMentor", { enumerable: true, get: function () { return mentor_controller_1.getMentor; } });
Object.defineProperty(exports, "v2GetMentors", { enumerable: true, get: function () { return mentor_controller_1.getMentors; } });
const repo_controller_1 = require("./repo.controller");
Object.defineProperty(exports, "v2GetRepos", { enumerable: true, get: function () { return repo_controller_1.getRepos; } });
Object.defineProperty(exports, "v2GetTechStacks", { enumerable: true, get: function () { return repo_controller_1.getUniqueTechStacks; } });