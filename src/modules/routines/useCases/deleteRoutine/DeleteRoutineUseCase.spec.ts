import InMemoryUsersRepository from "../../../users/repositories/test/InMemoryUsersRepository"
import InMemoryRoutinesRepository from "../../repositories/test/InMemoryRoutinesRepository"
import DeleteRoutineUseCase from "./DeleteRoutineUseCase"

let routinesRepository: InMemoryRoutinesRepository
let deleteRoutineUseCase: DeleteRoutineUseCase
let usersRepository: InMemoryUsersRepository

describe('Delete Routine', () => {
  beforeEach(() => {
    routinesRepository = new InMemoryRoutinesRepository()
    deleteRoutineUseCase = new DeleteRoutineUseCase(routinesRepository)

    usersRepository = new InMemoryUsersRepository()
  })

  it('should be able to delete a routine', async () => {
    const testUser = await usersRepository.createUser({
      name: 'John Doe',
      username: 'jdoe',
      password: 'test pass'
    })

    const routine = await routinesRepository.createRoutine({
      user_id: testUser.id
    })
    const routine2 = await routinesRepository.createRoutine({
      user_id: testUser.id
    })


    expect(routinesRepository.routines).toHaveLength(2)
    await deleteRoutineUseCase.execute(routine.id)
    expect(routinesRepository.routines).toHaveLength(1)

    const searchedRoutine1 = await routinesRepository.findRoutine(routine.id)
    expect(searchedRoutine1).toBeNull()

    const searchedRoutine2 = await routinesRepository.findRoutine(routine2.id)
    expect(searchedRoutine2).not.toBeNull()
  })
})