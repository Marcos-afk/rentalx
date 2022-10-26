import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const authenticateRouter = Router();

authenticateRouter.post('/', authenticateUserController.handle);
authenticateRouter.post('/refresh-token', refreshTokenController.handle);
export { authenticateRouter };
