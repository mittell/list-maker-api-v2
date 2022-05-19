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
}
