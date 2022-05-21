import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	request,
	requestParam,
	requestBody,
	response,
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
import { IUserService } from '../interfaces/userService.interface';
import { IUserController } from '../interfaces/userController.interface';
import { CreateUserDto } from '../dto/createUser.dto';
import { PutUserDto } from '../dto/putUser.dto';
import { PatchUserDto } from '../dto/patchUser.dto';
import { ReturnUserDto } from '../dto/returnUser.dto';

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

	@httpGet('/')
	async getUsers(
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._userService
			.getUserList()
			.then((model) => {
				return Promise.all(
					Array.from(model, async (item) => {
						return await new ReturnUserDto().mapFromModel(item);
					})
				);
			})
			.then((dto) => {
				return this.json(dto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpGet('/:id')
	async getUserById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._userService
			.getUserById(id)
			.then(async (model) => {
				return await new ReturnUserDto().mapFromModel(model);
			})
			.then((dto) => {
				return this.json(dto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost('/')
	async createUser(
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await new CreateUserDto()
			.mapFromRequest(body)
			.then(async (dto) => {
				return this._userService.createUser(dto);
			})
			.then((model) => {
				return new ReturnUserDto().mapFromModel(model);
			})
			.then((dto) => {
				return this.json(dto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPut('/:id')
	async putUserById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await new PutUserDto()
			.mapFromRequest(id, body)
			.then(async (dto) => {
				return this._userService.updateUser(dto);
			})
			.then((model) => {
				return new ReturnUserDto().mapFromModel(model);
			})
			.then((result) => {
				return this.json(result);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPatch('/:id')
	async patchUserById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await new PatchUserDto()
			.mapFromRequest(id, body)
			.then(async (dto) => {
				return this._userService.updateUser(dto);
			})
			.then((model) => {
				return new ReturnUserDto().mapFromModel(model);
			})
			.then((result) => {
				return this.json(result);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpDelete('/:id')
	async deleteUserById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._userService
			.deleteUser(id)
			.then((_dto) => {
				return this.ok();
			})
			.catch((error) => {
				return next(error);
			});
	}
}
