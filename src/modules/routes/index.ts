import { Router } from 'express';
import { authenticateRouter } from './authenticate.router';
import { categoriesRoutes } from './categories.router';
import { specificationsRoutes } from './specifications.router';
import { usersRoutes } from './users.router';

const Routes = Router();

Routes.use('/categories', categoriesRoutes);
Routes.use('/specifications', specificationsRoutes);
Routes.use('/users', usersRoutes);
Routes.use('/authenticate-user', authenticateRouter);

export { Routes };
