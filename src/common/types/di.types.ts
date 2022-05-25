const TYPES = {
	// Context
	IContext: Symbol.for('IContext'),

	// Models
	IUserModel: Symbol.for('IUserModel'),
	IListModel: Symbol.for('IListModel'),
	IListItemModel: Symbol.for('IListItemModel'),

	// DAOs
	IUserDao: Symbol.for('IUserDao'),
	IListDao: Symbol.for('IListDao'),
	IListItemDao: Symbol.for('IListItemDao'),

	// Services
	IAuthService: Symbol.for('IAuthService'),
	IUserService: Symbol.for('IUserService'),
	IListService: Symbol.for('IListService'),
	IListItemService: Symbol.for('IListItemService'),

	// Controllers
	IAuthController: Symbol.for('IAuthController'),
	IUserController: Symbol.for('IUserController'),
	IListController: Symbol.for('IListController'),
	IListItemController: Symbol.for('IListItemController'),

	// Middleware
	IVerifyPasswordMiddleware: Symbol.for('IVerifyPasswordMiddleware'),
	IVerifyJsonWebTokenMiddleware: Symbol.for('IVerifyJsonWebTokenMiddleware'),
	IVerifyUserPermissionMiddleware: Symbol.for(
		'IVerifyUserPermissionMiddleware'
	),
	IVerifyRefreshBodyMiddleware: Symbol.for('IVerifyRefreshBodyMiddleware'),
	IVerifyRefreshTokenMiddleware: Symbol.for('IVerifyRefreshTokenMiddleware'),
	IValidateLoginRequestMiddleware: Symbol.for(
		'IValidateLoginRequestMiddleware'
	),
	IValidateListItemCreateRequestMiddleware: Symbol.for(
		'IValidateListItemCreateRequestMiddleware'
	),
	IValidateListItemPatchRequestMiddleware: Symbol.for(
		'IValidateListItemPatchRequestMiddleware'
	),
	IValidateListItemPutRequestMiddleware: Symbol.for(
		'IValidateListItemPutRequestMiddleware'
	),
	IValidateListCreateRequestMiddleware: Symbol.for(
		'IValidateListCreateRequestMiddleware'
	),
	IValidateListPatchRequestMiddleware: Symbol.for(
		'IValidateListPatchRequestMiddleware'
	),
	IValidateListPutRequestMiddleware: Symbol.for(
		'IValidateListPutRequestMiddleware'
	),
	IValidateUserCreateRequestMiddleware: Symbol.for(
		'IValidateUserCreateRequestMiddleware'
	),
	IValidateUserPatchRequestMiddleware: Symbol.for(
		'IValidateUserPatchRequestMiddleware'
	),
	IValidateUserPutRequestMiddleware: Symbol.for(
		'IValidateUserPutRequestMiddleware'
	),
};

export { TYPES };
