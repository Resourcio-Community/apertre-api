"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = require("express");
const mentee_route_1 = require("./mentee.route");
const mentor_route_1 = require("./mentor.route");
const repo_route_1 = require("./repo.route");
const router = (0, express_1.Router)();
exports.v1Router = router;
router.use('/mentee', mentee_route_1.menteeRoute);
router.use('/mentor', mentor_route_1.mentorRoute);
router.use('/repo', repo_route_1.repoRoute);
