import { Router, Request, Response } from 'express';
import { SpecificationRepository } from '../implementations/SpecificationRepository';
import { CreateSpecificationService } from '../services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(specificationRepository);
  const specification = createSpecificationService.execute({ name, description });

  return res.status(201).json(specification);
});

export { specificationsRoutes };
