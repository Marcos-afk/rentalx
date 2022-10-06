import { Router } from 'express';
import { CreateSpecificationController } from '../cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../cars/useCases/listSpecifications/ListSpecificationsController';

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();
const specificationsRoutes = Router();

specificationsRoutes.get('/', listSpecificationsController.handle);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
