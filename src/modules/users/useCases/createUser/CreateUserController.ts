import { Request, Response } from 'express'
import UsersRepository from '../../repositories/UsersRepository'
import CreateUserUseCase from './CreateUserUseCase'

export default class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, username, password } = req.body

    const usersRepository = new UsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)
    await createUserUseCase.execute({
      name,
      username,
      password
    })

    return res.status(201).send()
  }
}