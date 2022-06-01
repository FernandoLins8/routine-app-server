import { Routine } from "@prisma/client";
import prisma from "../../../database/prismaClient";
import ICreateRoutineDTO from "../dtos/ICreateRoutineDTO";
import IRoutinesRepository from "./IRoutinesRepository";

export default class RoutinesRepository implements IRoutinesRepository {
  async createRoutine({ user_id, name }: ICreateRoutineDTO): Promise<Routine> {
    return await prisma.routine.create({
      data: {
        name,
        user_id
      }
    })
  }

  async listRoutines(user_id: string): Promise<Routine[]> {
    return await prisma.routine.findMany()
  }

  async findRoutine(routineId: string): Promise<Routine | null> {
    return await prisma.routine.findUnique({
      where: {
        id: routineId
      },
      include: {
        units: true,
        labels: true
      }
    })
  }
}