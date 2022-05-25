import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IVerifyRefreshTokenMiddleware } from '../interfaces/middleware/verifyRefreshTokenMiddleware';
import { BadRequestError } from '../../common/types/error.types';
import { TYPES } from '../../common/types/di.types';
import { IUserService } from '../../users/interfaces/service/userService.interface';
import crypto from 'crypto';
import env from '../../common/config/env.config';

@injectable()
export class VerifyRefreshTokenMiddleware
	extends BaseMiddleware
	implements IVerifyRefreshTokenMiddleware
{
	@inject(TYPES.IUserService) private readonly _userService!: IUserService;

	public async handler(req: Request, _res: Response, next: NextFunction) {
		const user: any = await this._userService.getUserByEmail(
			req.body.jwt.email
		);

		const salt = crypto.createSecretKey(
			Buffer.from(req.body.jwt.refreshKey.data)
		);

		const hash = crypto
			.createHmac('sha512', salt)
			.update(req.body.jwt.userId + env.JWT_SECRET)
			.digest('base64');

		if (hash === req.body.refreshToken) {
			req.body = {
				userId: user._id,
				email: user.email,
				username: user.username,
			};
			return next();
		} else {
			return next(new BadRequestError());
		}
	}
}
