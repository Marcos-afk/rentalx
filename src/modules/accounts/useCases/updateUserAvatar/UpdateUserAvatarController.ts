import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  public async handle(req: Request, res: Response) {
    const { id } = req.user;

    const avatarFile = req.file?.filename as string;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    const user = await updateUserAvatarUseCase.execute({ user_id: id, avatarFile });

    return res.status(200).json(user);
  }
}
