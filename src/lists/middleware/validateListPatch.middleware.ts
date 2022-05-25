import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListPatchRequestMiddleware } from '../interfaces/middleware/validateListRequestMiddleware.interface';
import { ValidationError } from '../../common/types/error.types';

@injectable()
export class ValidateListPatchRequestMiddleware
	extends BaseMiddleware
	implements IValidateListPatchRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		let title: any = req.body.title;
		let description: any = req.body.description;

		let errors: string[] = [];

		if (title && title === '') {
			errors.push('Title must have a value');
		}

		if (description && description === '') {
			errors.push('Description must have a value');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		return next();
	}
}
