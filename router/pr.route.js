import { Router } from 'express'
import { isAdmin } from '../middleware/admin.js'
import { createLeaderboard } from '../controllers/pr.controller.js'

const router = Router()

router.route('/leaderboard').get(isAdmin, createLeaderboard)

export { router as prRoute }