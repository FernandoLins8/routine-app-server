import { Routine } from "@prisma/client";
import { randomUUID } from "crypto";
import ICreateRoutineDTO from "../../dtos/ICreateRoutineDTO";
import IRoutinesRepository from "../IRoutinesRepository";

export default class InMemoryRoutinesRepository implements IRoutinesRepository {
  private routines: Routine[] = []

  async createRoutine({ user_id, name }: ICreateRoutineDTO): Promise<Routine> {
    const id = randomUUID()

    const routine = {
      id,
      user_id,
      name: name ?? null,
      created_at: new Date(),
      units: [],
      label: []
    }

    this.routines.push(routine)

    return routine
  }

  async listRoutines(user_id: string): Promise<Routine[]> {
    return this.routines.filter(routine => routine.user_id == user_id)
  }

  async findRoutine(routineId: string): Promise<Routine | null> {
    return this.routines.find(routine => routine.id == routineId) ?? null
  }
}