import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRouter } from './authenticate.router';
import { carsRoutes } from './cars.router';
import { categoriesRoutes } from './categories.router';
import { rentalRoutes } from './rentals.router';
import { specificationsRoutes } from './specifications.router';
import { usersRoutes } from './users.router';

const Routes = Router();

Routes.use('/categories', ensureAuthenticated, categoriesRoutes);
Routes.use('/specifications', ensureAuthenticated, specificationsRoutes);
Routes.use('/users', usersRoutes);
Routes.use('/authenticate-user', authenticateRouter);
Routes.use('/cars', carsRoutes);
Routes.use('/rentals', rentalRoutes);

export { Routes };
