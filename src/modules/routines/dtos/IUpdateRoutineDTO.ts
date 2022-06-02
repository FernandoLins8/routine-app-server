import { label } from "./ICreateLabelDTO"

export default interface IUpdateRoutineDTO {
  routine_id: string
  name?: string
  labels?: label[]
}
