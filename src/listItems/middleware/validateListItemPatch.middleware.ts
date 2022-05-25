import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateListItemPatchRequestMiddleware } from '../interfaces/middleware/validateListItemPatchRequestMiddleware.interface';
import { ValidationError } from '../../common/types/error.types';

@injectable()
export class ValidateListItemPatchRequestMiddleware
	extends BaseMiddleware
	implements IValidateListItemPatchRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		let title: any = req.body.title;
		let description: any = req.body.description;
		let isComplete: any = req.body.isComplete;
		let listId: any = req.body.listId;

		let errors: string[] = [];

		if (title && title === '') {
			errors.push('Title must have a value');
		}

		if (description && description === '') {
			errors.push('Description must have a value');
		}

		if (
			(isComplete && isComplete !== true) ||
			(isComplete && isComplete !== false)
		) {
			errors.push('IsComplete must have a true or false value');
		}

		if (listId && listId === '') {
			errors.push('ListId must have a value');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		return next();
	}
}
