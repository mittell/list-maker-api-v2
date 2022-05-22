import { NextFunction, Request, Response } from 'express';
// import { inject } from 'inversify';
import 'reflect-metadata';
import env from '../../common/config/env.config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
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
// import { TYPES } from '../../common/types/di.types';
import { IAuthController } from '../interfaces/authController.interface';
import { ValidationError } from '../../common/types/error.types';

interface ITokenReturnDto {
	accessToken: string;
	refreshToken: string;
}

class TokenReturnDto implements ITokenReturnDto {
	public accessToken: string;
	public refreshToken: string;

	constructor(access: string, refresh: string) {
		this.accessToken = access;
		this.refreshToken = refresh;
	}
}

@controller('')
export class AuthController
	extends BaseHttpController
	implements IAuthController
{
	// private _authService: IAuthService;

	// public constructor(@inject(TYPES.IAuthService) authService: IAuthService) {
	// 	super();
	// 	this._authService = authService;
	// }

	public constructor() {
		super();
	}

	// NOTE - Assumed body contains AccessToken, and UserId was inserted into body of request
	// via preceding middleware...

	@httpPost('/login')
	async login(
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		await this.generateJsonWebToken(body)
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost('/refresh')
	async refresh(
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		await this.generateJsonWebToken(body)
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async generateJsonWebToken(body: any): Promise<ITokenReturnDto> {
		return new Promise((resolve, _reject) => {
			try {
				const tokenExpirationInSeconds = 36000;
				const refreshId = body.userId + env.JWT_SECRET;
				const salt = crypto.createSecretKey(crypto.randomBytes(16));
				const hash = crypto
					.createHmac('sha512', salt)
					.update(refreshId)
					.digest('base64');
				body.refreshKey = salt.export();

				const token = jwt.sign(body, env.JWT_SECRET, {
					expiresIn: tokenExpirationInSeconds,
				});

				resolve(new TokenReturnDto(token, hash));
			} catch (error) {
				throw new ValidationError(
					'Unable to generate JSON Web Token',
					error
				);
			}
		});
	}
}
