import { Container } from 'inversify';
import { TYPES } from '../types/di.types';

import { IContext } from '../context/context.interface';
import { DbContext } from '../context/db.context';
import { IUserModel } from '../../users/interfaces/userModel.interface';
import { UserModel } from '../../users/models/user.model';
import { IUserDao } from '../../users/interfaces/userDao.interface';
import { UserDao } from '../../users/dao/user.dao';
import { IUserService } from '../../users/interfaces/userService.interface';
import { UserService } from '../../users/services/user.service';
import { IUserController } from '../../users/interfaces/userController.interface';
import { UserController } from '../../users/controllers/user.controller';
// import { IMiddleware } from '../interfaces/middleware.interface';

const container = new Container();

// Context Binding
container.bind<IContext>(TYPES.IContext).to(DbContext).inSingletonScope();

// Model Binding
container.bind<IUserModel>(TYPES.IUserModel).to(UserModel);

// DAO Binding
container.bind<IUserDao>(TYPES.IUserDao).to(UserDao);

// Service Binding
container.bind<IUserService>(TYPES.IUserService).to(UserService);

// Controller Binding
container.bind<IUserController>(TYPES.IUserController).to(UserController);

// Middleware Binding
// container.bind<IMiddleware>(TYPES.IMiddleware).to(ErrorMiddleware);

export { container };
