import AppError from "../../../../errors/AppError"
import InMemoryUsersRepository from "../../repositories/test/InMemoryUsersRepository"
import CreateUserUseCase from "../createUser/CreateUserUseCase"
import AuthenticateUseUseCase from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUseUseCase
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUseUseCase(usersRepository)
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    const userData = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'senha123'
    }

    await createUserUseCase.execute({
      name: userData.name,
      username: userData.username,
      password: userData.password
    })

    const result = await authenticateUserUseCase.execute({
      username: userData.username,
      password: userData.password
    })

    expect(result).toHaveProperty('token')
    expect(result.user).toEqual({
      name: userData.name,
      username: userData.username
    })
  })

  it('should not be able to authenticate a non existing user', async () => {
    await expect(async () => {
      const userData = {
        name: 'John Doe',
        username: 'johndoe',
        password: 'senha123'
      }

      await createUserUseCase.execute({
        name: userData.name,
        username: userData.username,
        password: userData.password
      })

      await authenticateUserUseCase.execute({
        username: 'incorrectUsername',
        password: userData.password
      })
    }).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with incorrect password', async () => {
    await expect(async () => {
      const userData = {
        name: 'John Doe',
        username: 'johndoe',
        password: 'senha123'
      }

      await createUserUseCase.execute({
        name: userData.name,
        username: userData.username,
        password: userData.password
      })

      await authenticateUserUseCase.execute({
        username: userData.username,
        password: 'wrong password'
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})