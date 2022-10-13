import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';

export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);
  if (!user) {
    throw new AppError('Usuário não encontrado', 404);
  }

  if (!user.isAdmin) {
    throw new AppError('Acesso negado', 403);
  }

  return next();
};
