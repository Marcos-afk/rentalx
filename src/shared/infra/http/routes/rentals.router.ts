import { Router } from 'express';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const rentalRoutes = Router();

rentalRoutes.get('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
