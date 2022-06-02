import { Request, Response } from 'express'
import RoutinesRepository from '../../repositories/RoutinesRepository'
import ShowRoutineUseCase from './ShowRoutineUseCase'

export default class ShowRoutineController {
  async handle(req: Request, res: Response) {
    const routine_id = req.params.id

    const routinesRepository = new RoutinesRepository()
    const showRoutineUseCase = new ShowRoutineUseCase(routinesRepository)

    const routine = await showRoutineUseCase.execute(routine_id)

    return res.json(routine)
  }
}