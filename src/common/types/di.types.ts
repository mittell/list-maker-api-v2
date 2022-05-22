const TYPES = {
	// Context
	IContext: Symbol.for('IContext'),

	// Models
	IUserModel: Symbol.for('IUserModel'),

	// DAOs
	IUserDao: Symbol.for('IUserDao'),

	// Services
	IAuthService: Symbol.for('IAuthService'),
	IUserService: Symbol.for('IUserService'),

	// Controllers
	IUserController: Symbol.for('IUserController'),
	IAuthController: Symbol.for('IAuthController'),

	// Middleware
	IVerifyPasswordMiddleware: Symbol.for('IVerifyPasswordMiddleware'),
	IVerifyJsonWebTokenMiddleware: Symbol.for('IVerifyJsonWebTokenMiddleware'),
	IVerifyPermissionMiddleware: Symbol.for('IVerifyPermissionMiddleware'),
	IVerifyRefreshBodyMiddleware: Symbol.for('IVerifyRefreshBodyMiddleware'),
	IVerifyRefreshTokenMiddleware: Symbol.for('IVerifyRefreshTokenMiddleware'),
};

export { TYPES };
