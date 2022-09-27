import { Router, Request, Response } from 'express';
import { createCategoryController } from '../useCases/createCategory';
import { listCategoriesController } from '../useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.get('/', (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

export { categoriesRoutes };
