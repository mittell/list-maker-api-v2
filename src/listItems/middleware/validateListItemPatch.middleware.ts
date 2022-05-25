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
		// body('title').optional().notEmpty(),
		// body('description').optional().notEmpty(),
		// body('isComplete').optional().isBoolean(),
		// body('listId').optional().notEmpty(),
		// body().custom((_value, { req }) => {
		// 	let body = req.body;
		// 	if (
		// 		(body.constructor === Object &&
		// 			Object.keys(body).length === 0) ||
		// 		(Object.keys(body).length === 1 && body['id'] !== undefined)
		// 	) {
		// 		throw new Error('Body cannot be empty');
		// 	}

		// 	return true;
		// }),
		// body().custom((_value, { req }) => {
		// 	let body = req.body;

		// 	if (
		// 		body['title'] !== undefined ||
		// 		body['description'] !== undefined ||
		// 		body['isComplete'] !== undefined ||
		// 		body['listId'] !== undefined
		// 	) {
		// 		return true;
		// 	}

		// 	throw new Error('Body does not contain valid data');
		// }),

		return next();
	}
}
