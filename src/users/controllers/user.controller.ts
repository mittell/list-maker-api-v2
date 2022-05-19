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
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IUserService } from '../interfaces/userService.interface';
import { IUserController } from '../interfaces/userController.interface';
import { IHttpActionResult } from 'inversify-express-utils';

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
		let data = await this._userService.getUserList();
		return this.ok({ data });
	}

	@httpGet('/:id')
	async getUserById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response
	): Promise<IHttpActionResult> {
		let data = await this._userService.getUserById(id);
		return this.ok({ data });
	}
}
