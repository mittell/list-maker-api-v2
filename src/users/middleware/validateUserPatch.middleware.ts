import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateUserPatchRequestMiddleware } from '../interfaces/middleware/validateUserRequestMiddleware.interface';

@injectable()
export class ValidateUserPatchRequestMiddleware
	extends BaseMiddleware
	implements IValidateUserPatchRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		// body('username').optional().notEmpty(),
		// body('email').optional().notEmpty().isEmail(),
		// body('password').optional().notEmpty().isLength({ min: 6 }),
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
		// 		body['username'] !== undefined ||
		// 		body['email'] !== undefined ||
		// 		body['password'] !== undefined
		// 	) {
		// 		return true;
		// 	}

		// 	throw new Error('Body does not contain valid data');
		// }),

		return next();
	}
}
