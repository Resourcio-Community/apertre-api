import { Router } from 'express'
import { isAdmin } from '../middleware/admin.js'
import { addMentor, getMentor, getMentors } from '../controllers/mentor.controller.js'

const router = Router()

router.get('/', isAdmin, getMentors)
router.get('/:email', isAdmin, getMentor)
router.post('/', addMentor)

export { router as mentorRoute }