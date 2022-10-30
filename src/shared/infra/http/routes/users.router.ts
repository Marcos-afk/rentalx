import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '../../../../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ProfileUserController } from '../../../../modules/accounts/useCases/profileUserUseCase/ProfileUserController';

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const uploadAvatar = multer(uploadConfig);
const usersRoutes = Router();

usersRoutes.get('/', ensureAuthenticated, profileUserController.handle);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };
