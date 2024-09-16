"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repoRoute = void 0;
const express_1 = require("express");
const v1_1 = require("../../controllers/v1");
const router = (0, express_1.Router)();
exports.repoRoute = router;
router.route('/getrepos').get(v1_1.v1GetRepos);
router.route('/gettags').get(v1_1.v1GetTechStacks);
