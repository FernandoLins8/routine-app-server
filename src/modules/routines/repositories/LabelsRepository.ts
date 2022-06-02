import prisma from "../../../database/prismaClient";
import ICreateLabelDTO from "../dtos/ICreateLabelDTO";
import ILabelsRepository from "./ILabelsRepository";

export default class LabelsRepository implements ILabelsRepository {
  async createLabel({ routineId, name, color }: ICreateLabelDTO) {
    return await prisma.label.create({
      data: {
        name: name,
        color: color,
        routine_id: routineId
      }
    })
  }

  async deleteAllLabelsFromRoutine(routineId: string) {
    await prisma.label.deleteMany({
      where: {
        routine_id: routineId
      }
    })
  }
}