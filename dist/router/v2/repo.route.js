"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repoRoute = void 0;
const express_1 = require("express");
const v2_1 = require("../../controllers/v2");
const router = (0, express_1.Router)();
exports.repoRoute = router;
router.route('/getrepos').get(v2_1.v2GetRepos);
router.route('/gettags').get(v2_1.v2GetTechStacks);
