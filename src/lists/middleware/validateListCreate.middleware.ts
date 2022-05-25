import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListCreateRequestMiddleware } from '../interfaces/middleware/validateListCreateRequestMiddleware.interface';

@injectable()
export class ValidateListCreateRequestMiddleware
	extends BaseMiddleware
	implements IValidateListCreateRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		// body('title').exists().notEmpty(),
		// body('description').exists().notEmpty(),

		return next();
	}
}
