import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { UsersRepositoryProps } from '../../repositories/UsersRepositoryProps';

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
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepositoryProps) {}

  public async execute({ email, password }: RequestProps): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email ou senha incorreto');
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Email ou senha incorreto');
    }

    const token = sign({}, process.env.JWT_KEY as string, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const responseReturned: Response = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return responseReturned;
  }
}
