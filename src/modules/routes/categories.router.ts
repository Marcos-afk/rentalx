import { Router, Request, Response } from 'express';
import { createCategoryController } from '../cars/useCases/createCategory';
import { listCategoriesController } from '../cars/useCases/listCategories';
import multer from 'multer';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

categoriesRoutes.get('/', (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req: Request, res: Response) => {
  const { file } = req;
  return res.status(200).json(file);
});

export { categoriesRoutes };
