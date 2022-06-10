import prisma from "../../../database/prismaClient";
import IUpdateUnitsLabelsDTO from "../dtos/IUpdateUnitsLabelsDTO";
import IUnitsRepository from "./IUnitsRepository";

export default class UnitsRepository implements IUnitsRepository {
  async generateUnits(routineId: string): Promise<void> {
    for (let hour = 0, count = 0; hour < 24; hour++, count += 2) {
      // Create hour unit
      // ex.: 00:00 - 01:00
      await prisma.unit.create({
        data: {
          count: count,
          start_time: `${String(hour).padStart(2, '0')}:00`,
          end_time: `${String(hour + 1).padStart(2, '0')}:00`,
          routine_id: routineId
        }
      })
    }
  }

  async updateLabelUnits({ routineId, labelId, units }: IUpdateUnitsLabelsDTO): Promise<void> {
    await prisma.unit.updateMany({
      data: {
        label_id: labelId
      },
      where: {
        routine_id: routineId,
        count: { in: units }
      }
    })
  }
}