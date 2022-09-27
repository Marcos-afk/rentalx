import { Router } from 'express';
import { categoriesRoutes } from './categories.router';
import { specificationsRoutes } from './specifications.router';

const Routes = Router();

Routes.use('/categories', categoriesRoutes);
Routes.use('/specifications', specificationsRoutes);

export { Routes };
