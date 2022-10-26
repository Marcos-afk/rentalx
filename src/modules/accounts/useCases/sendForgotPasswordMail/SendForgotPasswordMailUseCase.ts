import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';
import { UsersTokensRepositoryProps } from '../../repositories/UsersTokensRepositoryProps';
import { v4 as uuidV4 } from 'uuid';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';
import { MailProviderProps } from '../../../../shared/providers/MailProvider/MailProviderProps';
import { resolve } from 'path';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
    @inject('UsersTokensRepository') private usersTokensRepository: UsersTokensRepositoryProps,
    @inject('DateProvider') private dateProvider: DateProviderProps,
    @inject('MailProvider') private mailProvider: MailProviderProps,
  ) {}

  public async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dateProvider.addHours(3),
    });

    const variables = {
      name: user.name,
      link: `${process.env.RESET_PASSWORD_URL}?token=${token}`,
    };

    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }
}
