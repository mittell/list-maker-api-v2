import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IListController {
	// getLists(
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction
	// ): Promise<IHttpActionResult | void>;

	getLists(
		body: any,
		page: string | undefined,
		limit: string | undefined,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	getListById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	// getListByIdAndUserId(
	// 	id: string,
	// 	req: Request,
	// 	res: Response,
	// 	next: NextFunction
	// ): Promise<IHttpActionResult | void>;

	createList(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	putListById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	patchListById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	deleteListById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
