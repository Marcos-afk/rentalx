import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

export class ResetPasswordUserController {
  public async handle(req: Request, res: Response) {
    const token = req.query.token as string;
    const { password } = req.body;
    const resetPassword = container.resolve(ResetPasswordUserUseCase);

    await resetPassword.execute(token, password);

    return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  }
}
