import { Router, Request, Response } from 'express';
import { createCategoryController } from '../cars/useCases/createCategory';
import { listCategoriesController } from '../cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.get('/', (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

export { categoriesRoutes };
