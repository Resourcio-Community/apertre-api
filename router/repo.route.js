import { Router } from 'express'
import { getRepos, getUniqueTechStacks } from '../controllers/repo.controller.js'

const router = Router()

router.route('/getrepos').get(getRepos)
router.route('/gettags').get(getUniqueTechStacks)

export { router as repoRoute }