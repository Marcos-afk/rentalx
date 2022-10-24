import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

export class ListRentalsByUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.user;
    const listRentalsByUser = container.resolve(ListRentalsByUserUseCase);
    const rentals = await listRentalsByUser.execute(id);

    return res.status(200).json(rentals);
  }
}
