import InMemoryUsersRepository from "../../../users/repositories/test/InMemoryUsersRepository";
import InMemoryLabelsRepository from "../../repositories/test/InMemoryLabelsRepository";
import InMemoryRoutinesRepository from "../../repositories/test/InMemoryRoutinesRepository";
import InMemoryUnitsRepository from "../../repositories/test/InMemoryUnitsRepository";
import CreateRoutineUseCase from "../createRoutine/CreateRoutineUseCase";
import UpdateRoutineUseCase from "./UpdateRoutineUseCase";


let routinesRepository: InMemoryRoutinesRepository
let unitsRepository: InMemoryUnitsRepository
let labelsRepository: InMemoryLabelsRepository
let usersRepository: InMemoryUsersRepository

let updateRoutineUseCase: UpdateRoutineUseCase


describe('Update routine', () => {
  beforeEach(() => {
    routinesRepository = new InMemoryRoutinesRepository()
    labelsRepository = new InMemoryLabelsRepository()
    unitsRepository = new InMemoryUnitsRepository()

    updateRoutineUseCase = new UpdateRoutineUseCase(routinesRepository, labelsRepository, unitsRepository)

    usersRepository = new InMemoryUsersRepository()
  })

  it('should be able to update the name of a routine', async () => {
    const testUser = await usersRepository.createUser({
      name: 'John Doe',
      username: 'jdoe',
      password: 'test pass'
    })

    const routine = await routinesRepository.createRoutine({
      user_id: testUser.id
    })

    await updateRoutineUseCase.execute({
      routine_id: routine.id,
      name: 'New Routine'
    })

    expect(routine).toHaveProperty('name')
    expect(routine.name).toBe('New Routine')
  })

  it('should be able to create new labels', async () => {
    const testUser = await usersRepository.createUser({
      name: 'John Doe',
      username: 'jdoe',
      password: 'test pass'
    })

    const routine = await routinesRepository.createRoutine({
      user_id: testUser.id
    })

    await updateRoutineUseCase.execute({
      routine_id: routine.id,
      labels: [
        {
          "name": "Dormir",
          "color": "#225882",
          "units": "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12"
        },
        {
          "name": "Programar",
          "color": "#4c1861",
          "units": "42, 43, 44, 45, 46, 47"
        }
      ]
    })

    expect(labelsRepository.labels).toHaveLength(2)
  })

  it('should be able to replace old labels each time', async () => {
    const testUser = await usersRepository.createUser({
      name: 'John Doe',
      username: 'jdoe',
      password: 'test pass'
    })

    const routine = await routinesRepository.createRoutine({
      user_id: testUser.id
    })

    await updateRoutineUseCase.execute({
      routine_id: routine.id,
      labels: [
        {
          "name": "Dormir",
          "color": "#225882",
          "units": "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12"
        },
        {
          "name": "Programar",
          "color": "#4c1861",
          "units": "42, 43, 44, 45, 46, 47"
        }
      ]
    })

    await updateRoutineUseCase.execute({
      routine_id: routine.id,
      labels: [
        {
          "name": "Dormir",
          "color": "#225882",
          "units": "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12"
        }
      ]
    })

    expect(labelsRepository.labels).toHaveLength(1)
  })

  it('should be able to change the label of some units', () => {
    // TO DO
  })
})