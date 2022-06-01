import ICreateRoutineDTO from "../../dtos/ICreateRoutineDTO"
import IRoutinesRepository from "../../repositories/IRoutinesRepository"
import IUnitsRepository from "../../repositories/IUnitsRepository"

export default class CreateRoutineUseCase {
  constructor(
    private routinesRepository: IRoutinesRepository,
    private unitsRepository: IUnitsRepository
  ) { }

  async execute({ user_id, name }: ICreateRoutineDTO) {
    const routine = await this.routinesRepository.createRoutine({
      user_id, name
    })

    await this.unitsRepository.generateUnits(routine.id)

    return routine
  }
}