import { User } from "@prisma/client"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"

export default interface IUsersRepository {
  createUser(data: ICreateUserDTO): Promise<User>
  findByUsername(username: string): Promise<User | null>
}
