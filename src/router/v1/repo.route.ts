import { Router } from 'express'
import { v1GetRepos, v1GetTechStacks } from '../../controllers/v1'

const router = Router()

router.route('/getrepos').get(v1GetRepos)
router.route('/gettags').get(v1GetTechStacks)

export { router as repoRoute }
