import InMemoryUsersRepository from "../../../users/repositories/test/InMemoryUsersRepository"
import InMemoryRoutinesRepository from "../../repositories/test/InMemoryRoutinesRepository"
import ListRoutinesUseCase from "./ListRoutinesUseCase"

let routinesRepository: InMemoryRoutinesRepository
let usersRepository: InMemoryUsersRepository
let listRoutinesUseCase: ListRoutinesUseCase

describe('List Routines', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    routinesRepository = new InMemoryRoutinesRepository()
    listRoutinesUseCase = new ListRoutinesUseCase(routinesRepository)
  })

  it('should list all of routines of a user', async () => {
    const user = await usersRepository.createUser({
      name: 'teste',
      username: 'teste',
      password: 'teste',
    })

    const routine1 = await routinesRepository.createRoutine({
      user_id: user.id,
      name: 'First Routine'
    })

    const routine2 = await routinesRepository.createRoutine({
      user_id: user.id,
      name: 'Second Routine'
    })

    const routines = await listRoutinesUseCase.execute(user.id)

    expect(routines).toContain(routine1)
    expect(routines).toContain(routine2)
  })
})