import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateUserPutRequestMiddleware } from '../interfaces/middleware/validateUserItemPutRequestMiddleware.interface';

@injectable()
export class ValidateUserPutRequestMiddleware
	extends BaseMiddleware
	implements IValidateUserPutRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		return next();
	}
}
