import { Router } from 'express'
import { getRepos, getUniqueTechStacks } from '../controllers/repo.controller.js'

const router = Router()

router.get('/getrepos', getRepos)
router.get('/gettags', getUniqueTechStacks)

export { router as repoRoute }