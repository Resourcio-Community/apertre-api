import { Router } from 'express'
import { fetchAllData } from '../controllers/PR.controller.js'

const router = Router()

router.route('/').get(fetchAllData)

export { router as prRoute }