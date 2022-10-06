import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { container } from 'tsyringe';

export class CreateCategoryController {
  public async handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({ name, description });
    return res.status(201).json(category);
  }
}
