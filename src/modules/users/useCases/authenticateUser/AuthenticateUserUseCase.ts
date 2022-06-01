import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import AppError from "../../../../errors/AppError";
import IUsersRepository from "../../repositories/IUsersRepository";
import * as dotenv from 'dotenv';
dotenv.config();

interface IRequest {
  username: string
  password: string
}

export default class AuthenticateUseUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) { }

  async execute({ username, password }: IRequest) {
    const user = await this.usersRepository.findByUsername(username)
    if (!user) {
      throw new AppError('incorrect username or password')
    }

    const isPasswordCorrect = await compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new AppError('incorrect username or password')
    }

    const token = sign({}, process.env.SECRET_KEY as string, {
      subject: user.id,
      expiresIn: '1d',
    })

    const userReturn = {
      name: user.name,
      username: user.username
    }

    return {
      user: userReturn,
      token
    }
  }
}