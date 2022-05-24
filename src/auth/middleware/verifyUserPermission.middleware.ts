import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { UnauthenticatedError } from '../../common/types/error.types';
import { IVerifyUserPermissionMiddleware } from '../interfaces/verifyUserPermissionMiddleware.interface';

@injectable()
export class VerifyUserPermissionMiddleware
	extends BaseMiddleware
	implements IVerifyUserPermissionMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		const requestUserId = req.params.id;

		if (requestUserId === req.body.jwt.userId) {
			return next();
		}

		next(new UnauthenticatedError());
	}
}
