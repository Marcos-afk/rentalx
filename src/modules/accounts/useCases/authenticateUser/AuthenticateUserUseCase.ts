import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';
import { UsersTokensRepositoryProps } from '../../repositories/UsersTokensRepositoryProps';
import auth from '../../../../config/auth';
import { DateProviderProps } from '../../../../shared/providers/DateProvider/DateProviderProps';

interface RequestProps {
  email: string;
  password: string;
}

interface Response {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
    @inject('UsersTokensRepository') private usersTokensRepository: UsersTokensRepositoryProps,
    @inject('DateProvider') private dateProvider: DateProviderProps,
  ) {}

  public async execute({ email, password }: RequestProps) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email ou senha incorreto');
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('Email ou senha incorreto');
    }

    const token = sign({}, auth.secret_token as string, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token as string, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(auth.expires_in_refresh_token_days),
    });

    const responseReturned: Response = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };

    return responseReturned;
  }
}
