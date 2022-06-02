import RoutinesRepository from "../../repositories/RoutinesRepository";

export default class ShowRoutineUseCase {
  constructor(
    private routinesRepository: RoutinesRepository
  ) { }

  async execute(routine_id: string) {
    return await this.routinesRepository.findRoutine(routine_id)
  }
}