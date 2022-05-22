import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IUserController {
	getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	getUserById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	createUser(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	putUserById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	patchUserById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	deleteUserById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
