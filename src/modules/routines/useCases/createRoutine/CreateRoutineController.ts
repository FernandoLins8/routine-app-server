import { Request, Response } from "express";
import RoutinesRepository from "../../repositories/RoutinesRepository";
import UnitsRepository from "../../repositories/UnitsRepository";
import CreateRoutineUseCase from "./CreateRoutineUseCase";

export default class CreateRoutineController {
  async handle(req: Request, res: Response) {
    const { user_id } = req
    const { name } = req.body

    const routinesRepository = new RoutinesRepository()
    const unitsRepository = new UnitsRepository()
    const createRoutineUseCase = new CreateRoutineUseCase(routinesRepository, unitsRepository)

    await createRoutineUseCase.execute({
      user_id, name
    })

    return res.status(201).send()
  }
}