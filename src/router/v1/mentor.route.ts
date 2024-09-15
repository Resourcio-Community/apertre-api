import { Router } from 'express'
import { v1AddMentor, v1GetMentor, v1GetMentors } from '../../controllers/v1'
import { isAdmin } from '../../middleware/admin'

const router = Router()

router.route('/').get(isAdmin, v1GetMentors)
router.route('/:email').get(isAdmin, v1GetMentor)
router.route('/').post(v1AddMentor)

export { router as mentorRoute }
