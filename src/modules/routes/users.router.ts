import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '../../config/upload';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';
import { CreateUserController } from '../accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig('./tmp/avatar'));
const usersRoutes = Router();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };
