import { Routine } from "@prisma/client";
import ICreateRoutineDTO from "../dtos/ICreateRoutineDTO";
import IUpdateRoutineDTO from "../dtos/IUpdateRoutineDTO";

export default interface IRoutinesRepository {
  createRoutine(data: ICreateRoutineDTO): Promise<Routine>
  listRoutines(user_id: string): Promise<Routine[]>
  findRoutine(routineId: string): Promise<Routine | null>
  updateRoutine(data: IUpdateRoutineDTO): Promise<Routine>
  deleteRoutine(routineId: string): Promise<void>
}