// Router - connects route to controller

import { Router } from 'express';
import userController from './User.controller';

const userRouter = Router();

//Routes with no parameters go above those with parameters

userRouter.get('/', userController.all);
userRouter.get('/legal', userController.legal);
userRouter.get('/:id', userController.one);
userRouter.post('/', userController.save);
userRouter.delete('/:id', userController.del);

export default userRouter;
