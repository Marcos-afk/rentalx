import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '../modules/accounts/implementations/UsersRepository';
import { AppError } from '../errors/AppError';

interface TokenPayloadProps {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Sem token', 404);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, process.env.JWT_KEY as string);
    const { sub } = decodeToken as TokenPayloadProps;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return next();
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(`Ocorreu um erro: ${error.message}`);
    }
  }
};
