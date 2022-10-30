import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserUseCase } from './ProfileUserUseCase';

export class ProfileUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.user;

    const profileUser = container.resolve(ProfileUserUseCase);

    const user = await profileUser.execute(id);

    return res.status(200).json(user);
  }
}
