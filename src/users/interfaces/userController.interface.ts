import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IUserController {
	getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | IHttpActionResult>;

	getUserById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | IHttpActionResult>;

	createUser(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | IHttpActionResult>;

	putUserById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | IHttpActionResult>;

	patchUserById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | IHttpActionResult>;

	deleteUserById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | IHttpActionResult>;
}
