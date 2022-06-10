import { Unit } from "@prisma/client";
import { randomUUID } from "crypto";
import IUpdateUnitsLabelsDTO from "../../dtos/IUpdateUnitsLabelsDTO";
import IUnitsRepository from "../IUnitsRepository";

export default class InMemoryUnitsRepository implements IUnitsRepository {
  public units: Unit[] = []

  async generateUnits(routineId: string): Promise<void> {
    for (let hour = 0, count = 0; hour < 24; hour++, count += 2) {
      // Create hour unit
      // ex.: 00:00 - 01:00
      this.units.push({
        id: randomUUID(),
        count: count,
        start_time: `${String(hour).padStart(2, '0')}:00`,
        end_time: `${String(hour).padStart(2, '0')}:00`,
        routine_id: routineId,
        label_id: null
      })
    }
  }

  async updateLabelUnits({ routineId, labelId, units }: IUpdateUnitsLabelsDTO): Promise<void> {
    this.units.filter(unit => unit.routine_id == routineId && units.includes(unit.count))
      .forEach(unit => {
        unit.label_id = labelId
      })
  }
}