import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class SendForgotPasswordMailController {
  public async handle(req: Request, res: Response) {
    const { email } = req.body;

    const sendForgotPasswordMail = container.resolve(SendForgotPasswordMailUseCase);

    await sendForgotPasswordMail.execute(email);
    return res.status(200).json({ message: 'Informações enviadas para o email informado!' });
  }
}
