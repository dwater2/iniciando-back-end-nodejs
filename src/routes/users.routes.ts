import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import esnsureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UploadUserAvatarService';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password
  });
  delete user.password;
    return response.json(user);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) =>{
  const updateUserAvatarService = new UpdateUserAvatarService();
  const user = await updateUserAvatarService.excute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });
  delete user.password;
  return response.json(user);

})
export default usersRouter;
