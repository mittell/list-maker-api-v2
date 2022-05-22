import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IAuthController {
	login(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	refresh(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
