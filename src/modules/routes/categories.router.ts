import { Router } from 'express';
import { CreateCategoryController } from '../cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '../cars/useCases/importCategory/ImportCategoryController';
import multer from 'multer';

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
