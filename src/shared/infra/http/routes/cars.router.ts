import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/LIstCarsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();
const uploadImages = multer(uploadConfig('./tmp/cars'));

const carsRoutes = Router();

carsRoutes.get('/', listCarsController.handle);
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.patch('/:car_id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.patch(
  '/uploads/:car_id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
