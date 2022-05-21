import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IUserController {
	getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	getUserById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	createUser(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	putUserById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	patchUserById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	deleteUserById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;
}
