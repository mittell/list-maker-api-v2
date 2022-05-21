import { Request, Response } from 'express';
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
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IUserService } from '../interfaces/userService.interface';
import { IUserController } from '../interfaces/userController.interface';
import { CreateUserDto } from '../dto/createUser.dto';

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
	async getUserList(
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return this.json(await this._userService.getUserList());
	}

	@httpGet('/:id')
	async getUserById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return this.json(await this._userService.getUserById(id));
	}

	@httpPost('/')
	async createUser(
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return new CreateUserDto()
			.mapFromRequest(body)
			.then(async (dto) => {
				return this._userService.createUser(dto);
			})
			.then((result) => {
				return this.json(result);
			})
			.catch((error) => {
				return this.badRequest(error);
			});
	}

	@httpPut('/:id')
	async putUser(
		@requestParam('id') _id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return this.ok(await this._userService.updateUser(body));
	}

	@httpPatch('/:id')
	async patchUser(
		@requestParam('id') _id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return this.ok(await this._userService.updateUser(body));
	}

	@httpDelete('/:id')
	async deleteUser(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return this.ok(await this._userService.deleteUser(id));
	}
}
