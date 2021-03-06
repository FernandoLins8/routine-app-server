import { Routine } from "@prisma/client";
import prisma from "../../../database/prismaClient";
import ICreateRoutineDTO from "../dtos/ICreateRoutineDTO";
import IUpdateRoutineDTO from "../dtos/IUpdateRoutineDTO";
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
    return await prisma.routine.findMany({
      where: {
        user_id
      }
    })
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

  async updateRoutine({ routine_id, name }: IUpdateRoutineDTO): Promise<Routine> {
    return await prisma.routine.update({
      where: {
        id: routine_id
      },
      data: {
        name: name
      }
    })
  }

  async deleteRoutine(routineId: string): Promise<void> {
    await prisma.routine.delete({
      where: {
        id: routineId
      }
    })
  }
}