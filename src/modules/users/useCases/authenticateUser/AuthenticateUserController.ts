import { Request, Response } from 'express'
import UsersRepository from '../../repositories/UsersRepository'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'

export default class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body

    const usersRepository = new UsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    const authInfo = await authenticateUserUseCase.execute({
      username,
      password
    })

    return res.json(authInfo)
  }
}