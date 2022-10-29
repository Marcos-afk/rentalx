import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { UsersTokensRepositoryProps } from '../../repositories/UsersTokensRepositoryProps';
import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';

interface TokenPayloadProps {
  email: string;
  sub: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository') private usersTokensRepository: UsersTokensRepositoryProps,
    @inject('DateProvider') private dateProvider: DateProviderProps,
  ) {}

  public async execute(token: string) {
    const decodeToken = verify(token, auth.secret_refresh_token as string);
    const { sub, email } = decodeToken as TokenPayloadProps;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(sub, token);

    if (!userToken) {
      throw new AppError('Refresh token não existe');
    }

    await this.usersTokensRepository.deleteToken(userToken);

    const refresh_token = sign({ email }, auth.secret_refresh_token as string, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id: sub,
      refresh_token,
      expires_date: this.dateProvider.addDays(auth.expires_in_refresh_token_days),
    });

    const newToken = sign({}, auth.secret_token as string, {
      subject: sub,
      expiresIn: auth.expires_in_token,
    });

    return { refresh_token, newToken };
  }
}
