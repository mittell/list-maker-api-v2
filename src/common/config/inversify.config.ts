import { Container } from 'inversify';
import { TYPES } from '../types/di.types';

import { IContext } from '../context/context.interface';
import { DbContext } from '../context/db.context';
import { UserModel } from '../../users/models/user.model';
import { UserDao } from '../../users/dao/user.dao';
import { IUserService } from '../../users/interfaces/userService.interface';
import { UserService } from '../../users/services/user.service';
import { UserController } from '../../users/controllers/user.controller';
import { IUserController } from '../../users/interfaces/userController.interface';
import { IUserModel } from '../../users/interfaces/userModel.interface';
import { IUserDao } from '../../users/interfaces/userDao.interface';

const container = new Container();

// Context Binding
container.bind<IContext>(TYPES.IContext).to(DbContext).inSingletonScope();

// Service Binding
container.bind<IUserService>(TYPES.IUserService).to(UserService);

// Controller Binding
container.bind<IUserController>(TYPES.IUserController).to(UserController);

// Model Binding
container.bind<IUserModel>(TYPES.IUserModel).to(UserModel);

// DAO Binding
container.bind<IUserDao>(TYPES.IUserDao).to(UserDao);

export { container };
