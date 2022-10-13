import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {
  public async handle(req: Request, res: Response) {
    const { name, daily_rate, license_plate, fine_amount, brand, category_id, description } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
      name,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      description,
    });

    return res.status(201).json(car);
  }
}
