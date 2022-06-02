import { Label } from "@prisma/client";
import ICreateLabelDTO from "../dtos/ICreateLabelDTO";

export default interface ILabelsRepository {
  createLabel(data: ICreateLabelDTO): Promise<Label>
  deleteAllLabelsFromRoutine(routine_id: string): Promise<void>
}