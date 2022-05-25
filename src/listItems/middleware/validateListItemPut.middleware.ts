import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListItemPutRequestMiddleware } from '../interfaces/middleware/validateListItemPutRequestMiddleware.interface';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { ValidationError } from '../../common/types/error.types';

@injectable()
export class ValidateListItemPutRequestMiddleware
	extends BaseMiddleware
	implements IValidateListItemPutRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		let title: any = req.body.title;
		let description: any = req.body.description;
		let isComplete: any = req.body.isComplete;
		let listId: any = req.body.listId;

		let errors: string[] = [];

		if (isEmpty(title)) {
			errors.push('Title is required');
		}

		if (isEmpty(description)) {
			errors.push('Description is required');
		}

		if (isEmpty(isComplete)) {
			errors.push('IsComplete is required');
		}

		if (isEmpty(listId)) {
			errors.push('ListId is required');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		if (isComplete !== true || isComplete !== false) {
			errors.push('IsComplete must be true or false');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		return next();
	}
}
