import { SpecificationRepository } from '../../implementations/SpecificationRepository';
import { ListSpecificationsController } from './ListSpecificationsController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationsRepository = new SpecificationRepository();
const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationsRepository);
const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase);

export { listSpecificationsController };
