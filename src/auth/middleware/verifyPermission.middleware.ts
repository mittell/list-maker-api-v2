import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { UnauthenticatedError } from '../../common/types/error.types';
import { IVerifyPermissionMiddleware } from '../interfaces/verifyPermissionMiddleware.interface';

@injectable()
export class VerifyPermissionMiddleware
	extends BaseMiddleware
	implements IVerifyPermissionMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		const requestUserId = req.params.id;

		if (requestUserId === req.body.jwt.userId) {
			return next();
		}

		next(new UnauthenticatedError());
	}
}
