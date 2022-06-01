import AppError from "../../../../errors/AppError"
import UsersTestRepository from "../../repositories/test/InMemoryUsersRepository"
import CreateUserUseCase from "./CreateUserUseCase"

let usersRepository: UsersTestRepository
let createUserUseCase: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new UsersTestRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an user', async () => {
    const userData = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'testpassword',
    }

    const user = await createUserUseCase.execute(userData)

    expect(user).toHaveProperty('id')
    expect(user.password).not.toBe(userData.password)
  })

  it('should not be able to create two users with the same username', async () => {
    await expect(async () => {
      const userData1 = {
        name: 'John Doe',
        username: 'jdoe',
        password: 'testpassword',
      }

      const userData2 = {
        name: 'Jane Doe',
        username: 'jdoe',
        password: 'randompassword',
      }

      await createUserUseCase.execute(userData1)
      await createUserUseCase.execute(userData2)
    }).rejects.toBeInstanceOf(AppError);
  })
})