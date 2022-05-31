import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import { hash } from "bcrypt";

export default class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, username, password }: ICreateUserDTO) {
    const hashedPassword = await hash(password, 10)

    await this.usersRepository.createUser({
      name,
      username,
      password: hashedPassword
    })
  }
}