const TYPES = {
	IContext: Symbol.for('IContext'),
	IUserModel: Symbol.for('IUserModel'),
	IUserDao: Symbol.for('IUserDao'),
	IUserService: Symbol.for('IUserService'),
	IUserController: Symbol.for('IUserController'),
	IAuthController: Symbol.for('IAuthController'),
	IMiddleware: Symbol.for('IMiddleware'),
};

export { TYPES };
