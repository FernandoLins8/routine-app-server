import AppError from "../../../../errors/AppError";
import RoutinesRepository from "../../repositories/RoutinesRepository";

export default class DeleteRoutineUseCase {
  constructor(
    private routinesRepository: RoutinesRepository
  ) { }

  async execute(routineId: string) {
    const routineExists = await this.routinesRepository.findRoutine(routineId)

    if (!routineExists) {
      throw new AppError('routine does not exists', 400)
    }

    await this.routinesRepository.deleteRoutine(routineId)
  }
}