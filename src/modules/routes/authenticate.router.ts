import { Router } from 'express';
import { AuthenticateUserController } from '../accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateUserController = new AuthenticateUserController();
const authenticateRouter = Router();

authenticateRouter.post('/', authenticateUserController.handle);

export { authenticateRouter };
