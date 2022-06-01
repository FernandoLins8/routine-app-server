import { Routine } from "@prisma/client";
import ICreateRoutineDTO from "../dtos/ICreateRoutineDTO";

export default interface IRoutinesRepository {
  createRoutine(data: ICreateRoutineDTO): Promise<Routine>
  listRoutines(user_id: string): Promise<Routine[]>
  findRoutine(routineId: string): Promise<Routine | null>
}