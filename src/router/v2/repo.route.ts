import { Router } from 'express'
import { v2GetRepos, v2GetTechStacks } from '../../controllers/v2'

const router = Router()

router.route('/getrepos').get(v2GetRepos)
router.route('/gettags').get(v2GetTechStacks)

export { router as repoRoute }
