import { inject, injectable } from 'tsyringe';
import { CreateUserDtoProps } from '../../dtos/CreateUserDtoProps';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepositoryProps) {}

  public async execute({ name, password, email, driver_license }: CreateUserDtoProps) {
    const isExistingUser = await this.usersRepository.findByEmail(email);
    if (isExistingUser) {
      throw new Error('Email já está sendo utilizado');
    }

    const user = await this.usersRepository.create({ name, password, email, driver_license });
    return user;
  }
}
