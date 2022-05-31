import { ICreateUserDTO } from "../dtos/ICreateUserDTO"

export default interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<void>
}
