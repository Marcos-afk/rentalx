import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';

interface RequestProps {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepositoryProps) {}

  public async execute({ user_id, avatarFile }: RequestProps) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 400);
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile;

    await this.usersRepository.save(user);
    return user;
  }
}
