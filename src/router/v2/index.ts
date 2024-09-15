import { Router } from "express"
import { menteeRoute } from "./mentee.route"
import { mentorRoute } from "./mentor.route"
import { repoRoute } from "./repo.route"

const router = Router()

router.use('/mentee', menteeRoute)
router.use('/mentor', mentorRoute)
router.use('/repo', repoRoute)

export { router as v2Router }
