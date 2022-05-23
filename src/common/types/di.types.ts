const TYPES = {
	// Context
	IContext: Symbol.for('IContext'),

	// Models
	IUserModel: Symbol.for('IUserModel'),
	IListModel: Symbol.for('IListModel'),

	// DAOs
	IUserDao: Symbol.for('IUserDao'),
	IListDao: Symbol.for('IListDao'),

	// Services
	IAuthService: Symbol.for('IAuthService'),
	IUserService: Symbol.for('IUserService'),
	IListService: Symbol.for('IListService'),

	// Controllers
	IAuthController: Symbol.for('IAuthController'),
	IUserController: Symbol.for('IUserController'),
	IListController: Symbol.for('IListController'),

	// Middleware
	IVerifyPasswordMiddleware: Symbol.for('IVerifyPasswordMiddleware'),
	IVerifyJsonWebTokenMiddleware: Symbol.for('IVerifyJsonWebTokenMiddleware'),
	IVerifyPermissionMiddleware: Symbol.for('IVerifyPermissionMiddleware'),
	IVerifyRefreshBodyMiddleware: Symbol.for('IVerifyRefreshBodyMiddleware'),
	IVerifyRefreshTokenMiddleware: Symbol.for('IVerifyRefreshTokenMiddleware'),
};

export { TYPES };
