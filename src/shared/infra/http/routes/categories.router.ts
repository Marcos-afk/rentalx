import { Router } from 'express';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import multer from 'multer';
import { uploadConfig } from '../../../../config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

const categoriesRoutes = Router();

const upload = multer(uploadConfig('./tmp'));

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/', ensureAdmin, createCategoryController.handle);

categoriesRoutes.post('/import', ensureAdmin, upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };
