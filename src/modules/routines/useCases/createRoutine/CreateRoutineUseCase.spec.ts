import InMemoryUsersRepository from "../../../users/repositories/test/InMemoryUsersRepository"
import InMemoryRoutinesRepository from "../../repositories/test/InMemoryRoutinesRepository"
import InMemoryUnitsRepository from "../../repositories/test/InMemoryUnitsRepository"
import CreateRoutineUseCase from "./CreateRoutineUseCase"

let createRoutineUseCase: CreateRoutineUseCase
let routinesRepository: InMemoryRoutinesRepository
let unitsRepository: InMemoryUnitsRepository
let usersRepository: InMemoryUsersRepository

describe('Create Routine', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()

    routinesRepository = new InMemoryRoutinesRepository()
    unitsRepository = new InMemoryUnitsRepository()
    createRoutineUseCase = new CreateRoutineUseCase(routinesRepository, unitsRepository)
  })

  it('should be able to create a routine', async () => {
    const user = await usersRepository.createUser({
      name: 'teste',
      username: 'teste',
      password: 'teste',
    })

    const routine = await createRoutineUseCase.execute({
      user_id: user.id,
      name: 'random name'
    })

    expect(routine).toHaveProperty('id')
    expect(routine.name).toBe('random name')
  })

  it('should be able to create the 24 units when creating a routine', async () => {
    // restart units repository
    unitsRepository.units = []

    const user = await usersRepository.createUser({
      name: 'teste',
      username: 'teste',
      password: 'teste',
    })

    await createRoutineUseCase.execute({
      user_id: user.id,
      name: 'routine 1'
    })

    await createRoutineUseCase.execute({
      user_id: user.id,
      name: 'routine 2'
    })

    expect(unitsRepository.units.length).toBe(48) // 24 * 2
  })
})