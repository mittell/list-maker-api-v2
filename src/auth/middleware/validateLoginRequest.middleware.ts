import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { IValidateLoginRequestMiddleware } from '../interfaces/middleware/validateLoginRequestMiddleware.interface';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { ValidationError } from '../../common/types/error.types';

@injectable()
export class ValidateLoginRequestMiddleware
	extends BaseMiddleware
	implements IValidateLoginRequestMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		let email: any = req.body.email;
		let password: any = req.body.password;

		let errors: string[] = [];

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
