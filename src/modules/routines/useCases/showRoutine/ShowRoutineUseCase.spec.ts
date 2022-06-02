import InMemoryUsersRepository from "../../../users/repositories/test/InMemoryUsersRepository"
import InMemoryRoutinesRepository from "../../repositories/test/InMemoryRoutinesRepository"
import InMemoryUnitsRepository from "../../repositories/test/InMemoryUnitsRepository"
import CreateRoutineUseCase from "../createRoutine/CreateRoutineUseCase"
import ShowRoutineUseCase from "./ShowRoutineUseCase"


let routinesRepository: InMemoryRoutinesRepository
let usersRepository: InMemoryUsersRepository
let unitsRepository: InMemoryUnitsRepository

let createRoutineUseCase: CreateRoutineUseCase
let showRoutineUseCase: ShowRoutineUseCase

describe('Show Routine', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    routinesRepository = new InMemoryRoutinesRepository()
    unitsRepository = new InMemoryUnitsRepository()

    createRoutineUseCase = new CreateRoutineUseCase(routinesRepository, unitsRepository)
    showRoutineUseCase = new ShowRoutineUseCase(routinesRepository)
  })

  it('should list a specific routine', async () => {
    const user = await usersRepository.createUser({
      name: 'teste',
      username: 'teste',
      password: 'teste',
    })

    const routine = await createRoutineUseCase.execute({
      user_id: user.id,
      name: 'First Routine'
    })

    const routinesDetails = await showRoutineUseCase.execute(routine.id)
    expect(routinesDetails).toBe(routine)
  })
})