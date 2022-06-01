import { Router } from 'express'
import routinesRouter from './routines.routes'
import usersRouter from './users.routes'

const router = Router()

router.use('/users', usersRouter)
router.use('/routines', routinesRouter)

export default router
