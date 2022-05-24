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
import { IAuthController } from '../../auth/interfaces/authController.interface';
import { AuthController } from '../../auth/controllers/auth.controller';
import { IVerifyPasswordMiddleware } from '../../auth/interfaces/verifyPasswordMiddleware.interface';
import { VerifyPasswordMiddleware } from '../../auth/middleware/verifyPassword.middleware';
import { IVerifyJsonWebTokenMiddleware } from '../../auth/interfaces/verifyJsonWebTokenMiddleware.interface';
import { VerifyJsonWebTokenMiddleware } from '../../auth/middleware/verifyJsonWebToken.middleware';
import { IVerifyUserPermissionMiddleware } from '../../auth/interfaces/verifyUserPermissionMiddleware.interface';
import { VerifyUserPermissionMiddleware } from '../../auth/middleware/verifyUserPermission.middleware';
import { IVerifyRefreshBodyMiddleware } from '../../auth/interfaces/verifyRefreshBodyMiddleware.interface';
import { VerifyRefreshBodyMiddleware } from '../../auth/middleware/verifyRefreshBody.middleware';
import { IVerifyRefreshTokenMiddleware } from '../../auth/interfaces/verifyRefreshTokenMiddleware';
import { VerifyRefreshTokenMiddleware } from '../../auth/middleware/verifyRefreshToken.middleware';
import { IAuthService } from '../../auth/interfaces/authServices.interface';
import { AuthService } from '../../auth/services/auth.service';
import { IListModel } from '../../lists/interfaces/listModel.interface';
import { ListModel } from '../../lists/models/list.model';
import { IListDao } from '../../lists/interfaces/listDao.interface';
import { ListDao } from '../../lists/dao/list.dao';
import { IListService } from '../../lists/interfaces/listService.interface';
import { ListService } from '../../lists/services/list.service';
import { IListController } from '../../lists/interfaces/listController.interface';
import { ListController } from '../../lists/controllers/list.controller';
import { IListItemModel } from '../../listItems/interfaces/listItemModel.interface';
import { ListItemModel } from '../../listItems/models/listItem.model';
import { IListItemDao } from '../../listItems/interfaces/listItemDao.interface';
import { ListItemDao } from '../../listItems/dao/listItem.dao';
import { IListItemService } from '../../listItems/interfaces/listItemService.interface';
import { ListItemService } from '../../listItems/services/listItem.service';
import { IListItemController } from '../../listItems/interfaces/listItemController.interface';
import { ListItemController } from '../../listItems/controllers/listItem.controller';

const container = new Container();

// Context Binding
container.bind<IContext>(TYPES.IContext).to(DbContext).inSingletonScope();

// Model Binding
container.bind<IUserModel>(TYPES.IUserModel).to(UserModel);
container.bind<IListModel>(TYPES.IListModel).to(ListModel);
container.bind<IListItemModel>(TYPES.IListItemModel).to(ListItemModel);

// DAO Binding
container.bind<IUserDao>(TYPES.IUserDao).to(UserDao);
container.bind<IListDao>(TYPES.IListDao).to(ListDao);
container.bind<IListItemDao>(TYPES.IListItemDao).to(ListItemDao);

// Service Binding
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IListService>(TYPES.IListService).to(ListService);
container.bind<IListItemService>(TYPES.IListItemService).to(ListItemService);

// Controller Binding
container.bind<IAuthController>(TYPES.IAuthController).to(AuthController);
container.bind<IUserController>(TYPES.IUserController).to(UserController);
container.bind<IListController>(TYPES.IListController).to(ListController);
container
	.bind<IListItemController>(TYPES.IListItemController)
	.to(ListItemController);

// Middleware Binding
container
	.bind<IVerifyPasswordMiddleware>(TYPES.IVerifyPasswordMiddleware)
	.to(VerifyPasswordMiddleware);
container
	.bind<IVerifyJsonWebTokenMiddleware>(TYPES.IVerifyJsonWebTokenMiddleware)
	.to(VerifyJsonWebTokenMiddleware);
container
	.bind<IVerifyUserPermissionMiddleware>(
		TYPES.IVerifyUserPermissionMiddleware
	)
	.to(VerifyUserPermissionMiddleware);
container
	.bind<IVerifyRefreshBodyMiddleware>(TYPES.IVerifyRefreshBodyMiddleware)
	.to(VerifyRefreshBodyMiddleware);
container
	.bind<IVerifyRefreshTokenMiddleware>(TYPES.IVerifyRefreshTokenMiddleware)
	.to(VerifyRefreshTokenMiddleware);

export { container };
