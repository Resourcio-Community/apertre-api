import { Router } from 'express'
import { isAdmin } from '../middleware/admin.js'
import { addMentee, getMentee, getMentees } from '../controllers/mentee.controller.js'

const router = Router()

router.route('/').get(isAdmin, getMentees)
router.route('/:email').get(isAdmin, getMentee)
router.route('/').post(addMentee)

export { router as menteeRoute }