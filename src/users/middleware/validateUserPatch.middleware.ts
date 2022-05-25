import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateUserPatchRequestMiddleware } from '../interfaces/middleware/validateUserRequestMiddleware.interface';

@injectable()
export class ValidateUserPatchRequestMiddleware
	extends BaseMiddleware
	implements IValidateUserPatchRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		return next();
	}
}
