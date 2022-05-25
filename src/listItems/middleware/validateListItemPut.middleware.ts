import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListItemPutRequestMiddleware } from '../interfaces/middleware/validateListItemPutRequestMiddleware.interface';

@injectable()
export class ValidateListItemPutRequestMiddleware
	extends BaseMiddleware
	implements IValidateListItemPutRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		return next();
	}
}
