import prisma from "../../../database/prismaClient";
import IUnitsRepository from "./IUnitsRepository";

export default class UnitsRepository implements IUnitsRepository {
  async generateUnits(routineId: string): Promise<void> {
    for (let hour = 0, count = 0; hour < 24; hour++, count += 2) {
      // Create first half of an hour
      // ex.: 00:00 - 00:30
      await prisma.unit.create({
        data: {
          count: count,
          start_time: `${String(hour).padStart(2, '0')}:${'00'}`,
          end_time: `${String(hour).padStart(2, '0')}:${30}`,
          routine_id: routineId
        }
      })

      // Create second half of an hour
      // ex.: 00:30 - 01:00
      await prisma.unit.create({
        data: {
          count: count + 1,
          start_time: `${String(hour).padStart(2, '0')}:${30}`,
          end_time: `${String(hour + 1).padStart(2, '0')}:${'00'}`,
          routine_id: routineId
        }
      })
    }
  }
}