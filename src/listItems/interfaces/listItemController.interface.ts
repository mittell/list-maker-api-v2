import { Request, Response, NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IListItemController {
	getListItems(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	getListItemById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	createListItem(
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	putListItemById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	patchListItemById(
		id: string,
		body: any,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	deleteListItemById(
		id: string,
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
