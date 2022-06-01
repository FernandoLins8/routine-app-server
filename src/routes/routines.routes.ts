import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import CreateRoutineController from '../modules/routines/useCases/createRoutine/CreateRoutineController'

const routinesRouter = Router()
const createRoutineController = new CreateRoutineController()

routinesRouter.post('/', ensureAuthenticated, createRoutineController.handle)

export default routinesRouter
