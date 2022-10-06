import { Router } from 'express';
import { categoriesRoutes } from './categories.router';
import { specificationsRoutes } from './specifications.router';
import { usersRoutes } from './users.router';

const Routes = Router();

Routes.use('/categories', categoriesRoutes);
Routes.use('/specifications', specificationsRoutes);
Routes.use('/users', usersRoutes);

export { Routes };
