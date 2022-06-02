import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import CreateRoutineController from '../modules/routines/useCases/createRoutine/CreateRoutineController'
import ListRoutinesController from '../modules/routines/useCases/listRoutines/ListRoutinesController'
import ShowRoutineController from '../modules/routines/useCases/showRoutine/ShowRoutineController'
import UpdateRoutineController from '../modules/routines/useCases/updateRoutine/UpdateRoutineController'

const routinesRouter = Router()
const createRoutineController = new CreateRoutineController()
const listRoutinesController = new ListRoutinesController()
const showRoutineController = new ShowRoutineController()
const updateRoutineController = new UpdateRoutineController()

routinesRouter.post('/', ensureAuthenticated, createRoutineController.handle)
routinesRouter.get('/', ensureAuthenticated, listRoutinesController.handle)
routinesRouter.get('/detail/:id', ensureAuthenticated, showRoutineController.handle)
routinesRouter.put('/:id', ensureAuthenticated, updateRoutineController.handle)

export default routinesRouter
