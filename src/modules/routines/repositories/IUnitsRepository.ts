import IUpdateUnitsLabelsDTO from "../dtos/IUpdateUnitsLabelsDTO"

export default interface IUnitsRepository {
  generateUnits(routineId: string): Promise<void>
  updateLabelUnits(data: IUpdateUnitsLabelsDTO): Promise<void>
}