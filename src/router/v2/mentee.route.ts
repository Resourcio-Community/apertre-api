import { Router } from 'express'
import { v2AddMentee, v2GetMentee, v2GetMentees } from '../../controllers/v2'
import { isAdmin } from '../../middleware/admin'

const router = Router()

router.route('/').get(isAdmin, v2GetMentees)
router.route('/:email').get(isAdmin, v2GetMentee)
router.route('/').post(v2AddMentee)

export { router as menteeRoute }
