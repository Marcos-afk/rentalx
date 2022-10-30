import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { UserMap } from '../../mapper/UserMap';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';

@injectable()
export class ProfileUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepositoryProps) {}

  public async execute(user_id: string) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    return UserMap.toDto(user);
  }
}
