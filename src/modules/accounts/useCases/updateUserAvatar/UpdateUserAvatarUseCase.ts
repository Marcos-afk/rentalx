import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { StorageProviderProps } from '../../../../shared/providers/StorageProvider/StorageProviderProps';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';

interface RequestProps {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
    @inject('StorageProvider') private storageProvider: StorageProviderProps,
  ) {}

  public async execute({ user_id, avatarFile }: RequestProps) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 400);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatarFile, 'avatar');

    user.avatar = avatarFile;

    await this.usersRepository.save(user);
    return user;
  }
}
