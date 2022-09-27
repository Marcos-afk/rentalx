import { Router, Request, Response } from 'express';
import { createSpecificationController } from '../useCases/createSpecification';
import { listSpecificationsController } from '../useCases/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.get('/', (req: Request, res: Response) => {
  return listSpecificationsController.handle(req, res);
});

specificationsRoutes.post('/', (req: Request, res: Response) => {
  return createSpecificationController.handle(req, res);
});

export { specificationsRoutes };
