import { Request, Response } from "express"
import LabelsRepository from "../../repositories/LabelsRepository"
import RoutinesRepository from "../../repositories/RoutinesRepository"
import UnitsRepository from "../../repositories/UnitsRepository"
import UpdateRoutineUseCase from "./UpdateRoutineUseCase"

export default class UpdateRoutineController {
  async handle(req: Request, res: Response) {
    const routineId = req.params.id
    const {
      name,
      labels
    } = req.body

    const routinesRepository = new RoutinesRepository()
    const labelsRepository = new LabelsRepository()
    const unitsRepository = new UnitsRepository()
    const updateRoutineUseCase = new UpdateRoutineUseCase(routinesRepository, labelsRepository, unitsRepository)

    await updateRoutineUseCase.execute({
      routine_id: routineId,
      name,
      labels
    })

    return res.status(200).send()
  }
}