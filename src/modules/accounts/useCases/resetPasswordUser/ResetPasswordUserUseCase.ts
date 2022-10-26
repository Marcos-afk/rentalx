import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';
import { UsersTokensRepositoryProps } from '../../repositories/UsersTokensRepositoryProps';

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
    @inject('UsersTokensRepository') private usersTokensRepository: UsersTokensRepositoryProps,
    @inject('DateProvider') private dateProvider: DateProviderProps,
  ) {}

  public async execute(token: string, password: string) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);
    if (!userToken) {
      throw new AppError('Token não encontrado');
    }

    if (this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError('Token expirado');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('Usuário não foi encontrado');
    }

    user.password = await hash(password, 8);
    await this.usersRepository.save(user);
    await this.usersTokensRepository.deleteToken(userToken);
  }
}
