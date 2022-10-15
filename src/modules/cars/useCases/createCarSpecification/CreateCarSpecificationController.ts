import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  public async handle(req: Request, res: Response) {
    const { specification_id } = req.body;
    const { car_id } = req.params;

    const createCarSpecification = container.resolve(CreateCarSpecificationUseCase);

    const car = await createCarSpecification.execute({ car_id, specification_id });

    return res.status(201).json(car);
  }
}
