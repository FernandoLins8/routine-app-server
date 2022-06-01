import { User } from "@prisma/client";
import prisma from "../../../database/prismaClient";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import IUsersRepository from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  async createUser({ name, username, password }: ICreateUserDTO) {
    return await prisma.user.create({
      data: {
        name,
        username,
        password
      }
    })
  }

  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        username
      }
    })
  }
}