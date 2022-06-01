import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import IUsersRepository from "../IUsersRepository";

export default class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async createUser({ name, username, password }: ICreateUserDTO) {
    const hashedPassword = await hash(password, 10)
    const id = randomUUID()

    this.users.push({
      id,
      name,
      username,
      password: hashedPassword
    })

    const user = this.users.find(user => user.id == id) as User
    return user
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username == username) ?? null
  }
}