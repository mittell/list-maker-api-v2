import { NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IUserController {
	getUsers(next: NextFunction): Promise<IHttpActionResult | void>;

	getUserById(
		id: string,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	createUser(
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	putUserById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	patchUserById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	deleteUserById(
		id: string,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
