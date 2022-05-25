import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { BadRequestError } from '../../common/types/error.types';
import { IVerifyRefreshBodyMiddleware } from '../interfaces/middleware/verifyRefreshBodyMiddleware.interface';

@injectable()
export class VerifyRefreshBodyMiddleware
	extends BaseMiddleware
	implements IVerifyRefreshBodyMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		if (req.body && req.body.refreshToken) {
			return next();
		} else {
			return next(new BadRequestError());
		}
	}
}
