import { Router } from 'express'
import { isAdmin } from '../middleware/admin.js'
import { addMentor, getMentor, getMentors } from '../controllers/mentor.controller.js'

const router = Router()

router.route('/').get(isAdmin, getMentors)
router.route('/:email').get(isAdmin, getMentor)
router.route('/').post(addMentor)

export { router as mentorRoute }