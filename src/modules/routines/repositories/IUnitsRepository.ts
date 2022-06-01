export default interface IUnitsRepository {
  generateUnits(routineId: string): Promise<void>
}