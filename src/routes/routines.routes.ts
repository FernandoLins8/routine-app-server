import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import CreateRoutineController from '../modules/routines/useCases/createRoutine/CreateRoutineController'
import ListRoutinesController from '../modules/routines/useCases/listRoutines/ListRoutinesController'

const routinesRouter = Router()
const createRoutineController = new CreateRoutineController()
const listRoutinesController = new ListRoutinesController()

routinesRouter.post('/', ensureAuthenticated, createRoutineController.handle)
routinesRouter.get('/', ensureAuthenticated, listRoutinesController.handle)

export default routinesRouter
