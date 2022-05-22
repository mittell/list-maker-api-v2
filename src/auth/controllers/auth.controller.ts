import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';

import {
	controller,
	request,
	requestBody,
	response,
	httpPost,
	BaseHttpController,
	IHttpActionResult,
	next,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IAuthController } from '../interfaces/authController.interface';
import { IAuthService } from '../interfaces/authServices.interface';

@controller('')
export class AuthController
	extends BaseHttpController
	implements IAuthController
{
	private _authService: IAuthService;

	public constructor(@inject(TYPES.IAuthService) authService: IAuthService) {
		super();
		this._authService = authService;
	}

	@httpPost('/login', TYPES.IVerifyPasswordMiddleware)
	async login(
		@requestBody() body: any,
		@request() _req: Request,
		@response() res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		await this._authService
			.generateJsonWebToken(body)
			.then((returnDto) => {
				return res.send(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost(
		'/refresh',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyRefreshBodyMiddleware,
		TYPES.IVerifyRefreshTokenMiddleware
	)
	async refresh(
		@requestBody() body: any,
		@request() _req: Request,
		@response() res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		await this._authService
			.generateJsonWebToken(body)
			.then((returnDto) => {
				return res.send(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}
}
