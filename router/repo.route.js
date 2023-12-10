import { Router } from 'express'
import { getRepos } from '../controllers/repo.controller.js'

const router = Router()

router.get('/getrepos', getRepos)

export { router as repoRoute }