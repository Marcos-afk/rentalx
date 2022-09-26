import { Router, Request, Response } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const categories = categoriesRepository.list();

  return res.status(200).json(categories);
});

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = categoriesRepository.create({ name, description });

  return res.status(201).json(category);
});

export { categoriesRoutes };
