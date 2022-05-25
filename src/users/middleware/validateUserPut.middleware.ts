import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateUserPutRequestMiddleware } from '../interfaces/middleware/validateUserItemPutRequestMiddleware.interface';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { ValidationError } from '../../common/types/error.types';

@injectable()
export class ValidateUserPutRequestMiddleware
	extends BaseMiddleware
	implements IValidateUserPutRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		let username: any = req.body.username;
		let email: any = req.body.email;
		let password: any = req.body.password;

		let errors: string[] = [];

		if (isEmpty(username)) {
			errors.push('Username is required');
		}

		if (isEmpty(email)) {
			errors.push('Email is required');
		}

		if (isEmpty(password)) {
			errors.push('Password is required');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		let emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!email.match(emailRegex)) {
			errors.push('Email is not a valid email address');
		}

		if (password.length < 6) {
			errors.push('Password must be at least 6 characters');
		}

		if (errors.length > 0) {
			return next(new ValidationError('Invalid data', errors));
		}

		return next();
	}
}
