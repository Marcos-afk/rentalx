import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  public async handle(req: Request, res: Response) {
    const { name, email, username, password, driver_license } = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, username, email, password, driver_license });
    return res.status(201).json(user);
  }
}
