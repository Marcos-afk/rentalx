import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { CreateUserDtoProps } from '../../dtos/CreateUserDtoProps';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepositoryProps) {}

  public async execute({ name, password, email, driver_license }: CreateUserDtoProps) {
    const isExistingUser = await this.usersRepository.findByEmail(email);
    if (isExistingUser) {
      throw new AppError('Email inválido');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({ name, password: hashPassword, email, driver_license });
    return user;
  }
}
