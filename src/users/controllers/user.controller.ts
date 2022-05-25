import { NextFunction } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	requestParam,
	requestBody,
	httpGet,
	httpPost,
	httpPut,
	httpPatch,
	httpDelete,
	BaseHttpController,
	IHttpActionResult,
	next,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IUserService } from '../interfaces/service/userService.interface';
import { IUserController } from '../interfaces/controller/userController.interface';
import { CreateUserDto } from '../dto/createUser.dto';
import { PutUserDto } from '../dto/putUser.dto';
import { PatchUserDto } from '../dto/patchUser.dto';
import { ReturnUserDto } from '../dto/returnUser.dto';
import { NotFoundError } from '../../common/types/error.types';

@controller('/users')
export class UserController
	extends BaseHttpController
	implements IUserController
{
	private _userService: IUserService;

	public constructor(@inject(TYPES.IUserService) userService: IUserService) {
		super();
		this._userService = userService;
	}

	@httpGet('/', TYPES.IVerifyJsonWebTokenMiddleware)
	async getUsers(
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._userService
			// Get User List
			.getUserList()
			// Map each User to a DTO, and return as an Array
			.then((userList) => {
				return Promise.all(
					Array.from(userList, async (user) => {
						return new ReturnUserDto().mapFromModel(user);
					})
				);
			})
			// Return DTO
			.then((dto) => {
				return this.json(dto);
			})
			// Catch and return Error
			.catch((error) => {
				return next(error);
			});
	}

	@httpGet(
		'/:id',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyUserPermissionMiddleware
	)
	async getUserById(
		@requestParam('id') id: string,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._userService
			// Get User by Id
			.getUserById(id)
			// Map to DTO
			.then(async (user) => {
				return new ReturnUserDto().mapFromModel(user);
			})
			// Return DTO
			.then((dto) => {
				return this.json(dto);
			})
			// Catch and return Error
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost('/', TYPES.IValidateUserCreateRequestMiddleware)
	async createUser(
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return (
			new CreateUserDto()
				// Create DTO from Request
				.mapFromRequest(body)
				// Create User from DTO
				.then(async (requestDto) => {
					return this._userService.createUser(requestDto);
				})
				// Map new User to DTO
				.then((user) => {
					return new ReturnUserDto().mapFromModel(user);
				})
				// Return DTO
				.then((dto) => {
					return this.json(dto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpPut(
		'/:id',
		TYPES.IValidateUserPutRequestMiddleware,
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyUserPermissionMiddleware
	)
	async putUserById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Check if User exists
		let existingUser = await this._userService.getUserById(id);

		// If User does not exist, return NotFoundError
		if (!existingUser) {
			return next(new NotFoundError());
		}

		return (
			new PutUserDto()
				// Create DTO from Request
				.mapFromRequest(id, body)
				// Update User from DTO
				.then(async (requestDto) => {
					return this._userService.updateUser(requestDto);
				})
				// Map updated User to DTO
				.then((model) => {
					return new ReturnUserDto().mapFromModel(model);
				})
				// Return DTO
				.then((returnDto) => {
					return this.json(returnDto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpPatch(
		'/:id',
		TYPES.IValidateUserPatchRequestMiddleware,
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyUserPermissionMiddleware
	)
	async patchUserById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Check if User exists
		let existingUser = await this._userService.getUserById(id);

		// If User does not exist, return NotFoundError
		if (!existingUser) {
			return next(new NotFoundError());
		}

		return (
			new PatchUserDto()
				// Create DTO from Request
				.mapFromRequest(id, body)
				// Update User from DTO
				.then(async (requestDto) => {
					return this._userService.updateUser(requestDto);
				})
				// Map updated User to DTO
				.then((model) => {
					return new ReturnUserDto().mapFromModel(model);
				})
				// Return DTO
				.then((returnDto) => {
					return this.json(returnDto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpDelete(
		'/:id',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyUserPermissionMiddleware
	)
	async deleteUserById(
		@requestParam('id') id: string,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Check if User exists
		let existingUser = await this._userService.getUserById(id);

		// If User does not exist, return NotFoundError
		if (!existingUser) {
			return next(new NotFoundError());
		}

		return await this._userService
			// Delete User by Id
			.deleteUser(id)
			// Return OK Response
			.then(() => {
				return this.ok();
			})
			// Catch and return Error
			.catch((error) => {
				return next(error);
			});
	}
}
