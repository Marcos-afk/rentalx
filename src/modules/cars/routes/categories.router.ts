import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { createCategoryController } from '../useCases/createCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const categories = categoriesRepository.list();

  return res.status(200).json(categories);
});

categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

export { categoriesRoutes };
