export default interface ICreateLabelDTO {
  routineId: string
  name: string
  color: string
}

export type label = {
  name: string
  color: string
  units?: number[]
}