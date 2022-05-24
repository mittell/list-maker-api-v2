import { NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IListItemController {
	getListItemById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	createListItem(
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	putListItemById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	patchListItemById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	deleteListItemById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
