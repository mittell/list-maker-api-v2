import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListCreateRequestMiddleware } from '../interfaces/middleware/validateListCreateRequestMiddleware.interface';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { ValidationError } from '../../common/types/error.types';

@injectable()
export class ValidateListCreateRequestMiddleware
	extends BaseMiddleware
	implements IValidateListCreateRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		let title: any = req.body.title;
		let description: any = req.body.description;

		let errors: string[] = [];

		if (isEmpty(title)) {
			errors.push('Title is required');
		}

		if (isEmpty(description)) {
			errors.push('Description is required');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		return next();
	}
}
