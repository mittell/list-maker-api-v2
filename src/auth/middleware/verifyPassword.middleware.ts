import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IVerifyPasswordMiddleware } from '../interfaces/verifyPasswordMiddleware.interface';
import { IUserService } from '../../users/interfaces/userService.interface';
import { UnauthenticatedError } from '../../common/types/error.types';
import argon2 from 'argon2';

@injectable()
export class VerifyPasswordMiddleware
	extends BaseMiddleware
	implements IVerifyPasswordMiddleware
{
	@inject(TYPES.IUserService) private readonly _userService!: IUserService;

	public async handler(req: Request, _res: Response, next: NextFunction) {
		const user: any = await this._userService.getUserByEmail(
			req.body.email
		);
		if (user) {
			const passwordHash = user.password;
			if (await argon2.verify(passwordHash, req.body.password)) {
				req.body = {
					userId: user._id,
					email: user.email,
					username: user.username,
				};

				return next();
			}
		}

		return next(new UnauthenticatedError());
	}
}
