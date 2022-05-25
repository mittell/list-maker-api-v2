import { Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IAuthController {
	login(
		body: any,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	refresh(
		body: any,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
