import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json('PR Route')
})

export { router as prRoute }