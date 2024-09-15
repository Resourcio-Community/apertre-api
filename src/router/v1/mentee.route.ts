import { Router } from 'express'
import { isAdmin } from '../../middleware/admin'
import { v1AddMentee, v1GetMentee, v1GetMentees } from '../../controllers/v1'

const router = Router()

router.route('/').get(isAdmin, v1GetMentees)
router.route('/:email').get(isAdmin, v1GetMentee)
router.route('/').post(v1AddMentee)

export { router as menteeRoute }
