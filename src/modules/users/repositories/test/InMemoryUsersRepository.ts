import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import IUsersRepository from "../IUsersRepository";

export default class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async createUser({ name, username, password }: ICreateUserDTO) {
    const id = randomUUID()

    this.users.push({
      id,
      name,
      username,
      password
    })

    const user = this.users.find(user => user.id == id) as User
    return user
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username == username) ?? null
  }
}