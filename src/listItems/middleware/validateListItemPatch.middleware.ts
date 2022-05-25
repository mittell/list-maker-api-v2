import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListItemPatchRequestMiddleware } from '../interfaces/middleware/validateListItemPatchRequestMiddleware.interface';

@injectable()
export class ValidateListItemPatchRequestMiddleware
	extends BaseMiddleware
	implements IValidateListItemPatchRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		return next();
	}
}
