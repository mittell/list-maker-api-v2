import { Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	httpGet,
	request,
	response,
	BaseHttpController,
	requestParam,
	IHttpActionResult,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IUserService } from '../interfaces/userService.interface';
import { IUserController } from '../interfaces/userController.interface';

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
		return this.ok(await this._userService.getUserList());
	}

	@httpGet('/:id')
	async getUserById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		return this.ok(await this._userService.getUserById(id));
	}
}
