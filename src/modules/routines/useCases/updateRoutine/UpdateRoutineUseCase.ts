import IUpdateRoutineDTO from "../../dtos/IUpdateRoutineDTO";
import LabelsRepository from "../../repositories/LabelsRepository";
import RoutinesRepository from "../../repositories/RoutinesRepository";
import UnitsRepository from "../../repositories/UnitsRepository";

export default class UpdateRoutineUseCase {
  constructor(
    private routinesRepository: RoutinesRepository,
    private labelsRepository: LabelsRepository,
    private unitsRepository: UnitsRepository
  ) { }

  // Remove all labels from specific routine
  // Create all labels passed with correspondent units associated 
  async execute({ routine_id, name, labels }: IUpdateRoutineDTO) {
    const routine = await this.routinesRepository.updateRoutine({
      routine_id, name
    })

    if (labels) {
      await this.labelsRepository.deleteAllLabelsFromRoutine(routine_id)

      labels.forEach(async (label) => {
        const newLabel = await this.labelsRepository.createLabel({
          routineId: routine_id,
          name: label.name,
          color: label.color
        })

        if (label.units) {
          const newLabelUnits = label.units

          await this.unitsRepository.updateLabelUnits({
            routineId: routine_id,
            labelId: newLabel.id,
            units: newLabelUnits
          })
        }
      })
    }

    return routine
  }
}