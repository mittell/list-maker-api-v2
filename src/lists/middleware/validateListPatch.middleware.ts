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
		// body('title').optional().notEmpty(),
		// body('description').optional().notEmpty(),
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
		// 		body['description'] !== undefined
		// 	) {
		// 		return true;
		// 	}

		// 	throw new Error('Body does not contain valid data');
		// }),

		return next();
	}
}
