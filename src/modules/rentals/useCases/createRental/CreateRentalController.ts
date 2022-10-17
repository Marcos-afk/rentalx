import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalController {
  public async handle(req: Request, res: Response) {
    const { id } = req.user;
    const { car_id, expected_return_date } = req.body;

    const createRental = container.resolve(CreateRentalUseCase);
    const rental = await createRental.execute({ user_id: id, car_id, expected_return_date });

    return res.status(201).json(rental);
  }
}
