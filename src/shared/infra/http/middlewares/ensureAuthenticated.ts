import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
import auth from '../../../../config/auth';
import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

interface TokenPayloadProps {
  sub: string;
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();
  if (!authHeader) {
    throw new AppError('Sem token', 404);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, auth.secret_refresh_token as string);
    const { sub } = decodeToken as TokenPayloadProps;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(sub, token);
    if (!user) {
      throw new AppError('Token inválido', 401);
    }

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
};
