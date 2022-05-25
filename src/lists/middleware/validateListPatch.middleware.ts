import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListPatchRequestMiddleware } from '../interfaces/middleware/validateListRequestMiddleware.interface';

@injectable()
export class ValidateListPatchRequestMiddleware
	extends BaseMiddleware
	implements IValidateListPatchRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		return next();
	}
}
