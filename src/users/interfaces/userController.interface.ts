import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IUserController {
	getUserList(
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

	putUser(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	patchUser(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;

	deleteUser(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult>;
}
