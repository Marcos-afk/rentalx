import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
import auth from '../../../../config/auth';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';

interface TokenPayloadProps {
  sub: string;
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const usersRepository = new UsersRepository();
  if (!authHeader) {
    throw new AppError('Sem token', 404);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, auth.secret_token as string);
    const { sub } = decodeToken as TokenPayloadProps;

    const user = await usersRepository.findById(sub);
    if (!user) {
      throw new AppError('Token inválido', 401);
    }

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(`Error: ${error.message}`, 401);
    }
  }
};
