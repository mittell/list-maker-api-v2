import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListPutRequestMiddleware } from '../interfaces/middleware/validateListItemPutRequestMiddleware.interface';

@injectable()
export class ValidateListPutRequestMiddleware
	extends BaseMiddleware
	implements IValidateListPutRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		// body('title').exists().notEmpty(),
		// body('description').exists().notEmpty(),

		return next();
	}
}
