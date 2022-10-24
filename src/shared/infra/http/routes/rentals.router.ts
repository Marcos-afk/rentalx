import { Router } from 'express';
import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
const rentalRoutes = Router();

rentalRoutes.get('/', ensureAuthenticated, listRentalsByUserController.handle);
rentalRoutes.get('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };
