import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/LIstCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const carsRoutes = Router();

carsRoutes.get('/', listCarsController.handle);
carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

export { carsRoutes };
