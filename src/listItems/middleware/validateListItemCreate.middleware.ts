import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListItemCreateRequestMiddleware } from '../interfaces/middleware/validateListItemCreateRequestMiddleware.interface';

@injectable()
export class ValidateListItemCreateRequestMiddleware
	extends BaseMiddleware
	implements IValidateListItemCreateRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		// body('title').exists().notEmpty(),
		// body('description').exists().notEmpty(),
		// body('isComplete').if(body('isComplete').exists()).isBoolean(),
		// body('listId').exists().notEmpty(),

		return next();
	}
}
