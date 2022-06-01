import { Router } from 'express'
import AuthenticateUserController from '../modules/users/useCases/authenticateUser/AuthenticateUserController'
import CreateUserController from '../modules/users/useCases/createUser/CreateUserController'

const usersRouter = Router()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

usersRouter.post('/', createUserController.handle)
usersRouter.post('/login', authenticateUserController.handle)

export default usersRouter
