import { Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	httpGet,
	request,
	response,
	// requestParam,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IUserService } from '../interfaces/userService.interface';
import { IUserController } from '../interfaces/userController.interface';

@controller('/users')
export class UserController implements IUserController {
	private _userService: IUserService;

	public constructor(@inject(TYPES.IUserService) userService: IUserService) {
		this._userService = userService;
	}

	@httpGet('/')
	async getUserList(
		// @requestParam('id') id: string,
		@request() _req: Request,
		@response() res: Response
	): Promise<void> {
		// let data = await this._dummyService.getDummy(1);
		let data = await this._userService.getUserList();
		res.status(200).json({ data });
	}
}
