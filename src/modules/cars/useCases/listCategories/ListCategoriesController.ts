import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  public async handle(req: Request, res: Response) {
    const categories = await this.listCategoriesUseCase.execute();
    return res.status(200).json(categories);
  }
}
