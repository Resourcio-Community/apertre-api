import { Router } from 'express'
import { isAdmin } from '../middleware/admin.js'
import { addMentee, getMentee, getMentees } from '../controllers/mentee.controller.js'

const router = Router()

router.get('/', isAdmin, getMentees)
router.get('/:email', isAdmin, getMentee)
router.post('/', addMentee)

export { router as menteeRoute }