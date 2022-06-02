import RoutinesRepository from "../../repositories/RoutinesRepository";

export default class ListRoutinesUseCase {
  constructor(
    private routinesRepository: RoutinesRepository
  ) { }

  async execute(user_id: string) {
    return await this.routinesRepository.listRoutines(user_id)
  }
}