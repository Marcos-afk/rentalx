import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '../modules/accounts/implementations/UsersRepository';

interface TokenPayloadProps {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Sem token.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, process.env.JWT_KEY as string);
    const { sub } = decodeToken as TokenPayloadProps;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return next();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Ocorreu um erro: ${error.message}`);
    }
  }
};
