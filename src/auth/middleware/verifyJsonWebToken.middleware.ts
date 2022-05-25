import { injectable } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { UnauthenticatedError, UnauthorizedError } from '../../common/types/error.types';
import { IVerifyJsonWebTokenMiddleware } from '../interfaces/middleware/verifyJsonWebTokenMiddleware.interface';
import jwt from 'jsonwebtoken';
import env from '../../common/config/env.config';
import { Jwt } from '../../common/types/jwt.type';

@injectable()
export class VerifyJsonWebTokenMiddleware
	extends BaseMiddleware
	implements IVerifyJsonWebTokenMiddleware
{
	public async handler(req: Request, _res: Response, next: NextFunction) {
		if (req.headers['authorization']) {
			try {
				const authorization = req.headers['authorization'].split(' ');

				if (authorization[0] !== 'Bearer') {
					return next(new UnauthenticatedError());
				} else {
					//@ts-expect-error
					req.body.jwt = jwt.verify(
						//@ts-expect-error
						authorization[1],
						env.JWT_SECRET
					) as Jwt;
					return next();
				}
			} catch (err) {
				return next(new UnauthorizedError());
			}
		} else {
			return next(new UnauthenticatedError());
		}
	}
}
