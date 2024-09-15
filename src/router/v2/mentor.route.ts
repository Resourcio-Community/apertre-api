import { Router } from 'express'
import { v2AddMentor, v2GetMentor, v2GetMentors } from '../../controllers/v2'
import { isAdmin } from '../../middleware/admin'

const router = Router()

router.route('/').get(isAdmin, v2GetMentors)
router.route('/:email').get(isAdmin, v2GetMentor)
router.route('/').post(v2AddMentor)

export { router as mentorRoute }
