import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCarsUseCase } from './ListCarsUseCase';

export class ListCarsController {
  public async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;
    const brand = req.query.brand as string;
    const name = req.query.name as string;

    const listCars = container.resolve(ListCarsUseCase);
    const cars = await listCars.execute({ category_id, brand, name });

    return res.status(200).json(cars);
  }
}
