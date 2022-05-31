import prisma from "../../../database/prismaClient";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import IUsersRepository from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  async createUser({ name, username, password }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        username,
        password
      }
    })
  }
}