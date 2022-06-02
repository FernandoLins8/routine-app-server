import { Request, Response } from "express";
import RoutinesRepository from "../../repositories/RoutinesRepository";
import ListRoutinesUseCase from "./ListRoutinesUseCase";

export default class ListRoutinesController {
  async handle(req: Request, res: Response) {
    const { user_id } = req

    const routinesRepository = new RoutinesRepository()
    const listRoutinesUseCase = new ListRoutinesUseCase(routinesRepository)

    const userRoutines = await listRoutinesUseCase.execute(user_id)

    return res.json({ userRoutines })
  }
}