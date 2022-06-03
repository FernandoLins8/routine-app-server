import { Request, Response } from "express";
import RoutinesRepository from '../../repositories/RoutinesRepository'
import DeleteRoutineUseCase from "./DeleteRoutineUseCase";

export default class DeleteRoutineController {
  async handle(req: Request, res: Response) {
    const routineId = req.params.id

    const routinesRepository = new RoutinesRepository()
    const deleteRoutineUseCase = new DeleteRoutineUseCase(routinesRepository)

    await deleteRoutineUseCase.execute(routineId)

    return res.send()
  }
}