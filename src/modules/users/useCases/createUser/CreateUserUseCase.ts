import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import { hash } from "bcrypt";
import AppError from '../../../../errors/AppError';

export default class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, username, password }: ICreateUserDTO) {
    const hashedPassword = await hash(password, 10)

    const usernameAlreadyTaken = await this.usersRepository.findByUsername(username)
    if (usernameAlreadyTaken) {
      throw new AppError('username already in use')
    }

    return await this.usersRepository.createUser({
      name,
      username,
      password: hashedPassword
    })
  }
}