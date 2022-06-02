import { Label } from "@prisma/client";
import { randomUUID } from "crypto";
import ICreateLabelDTO from "../../dtos/ICreateLabelDTO";
import ILabelsRepository from "../ILabelsRepository";


export default class InMemoryLabelsRepository implements ILabelsRepository {
  public labels: Label[] = []

  async createLabel({ routineId, name, color }: ICreateLabelDTO): Promise<Label> {
    const label = {
      id: randomUUID(),
      name,
      color,
      routine_id: routineId
    }
    this.labels.push(label)

    return label
  }

  async deleteAllLabelsFromRoutine(routine_id: string): Promise<void> {
    this.labels = []
  }
}