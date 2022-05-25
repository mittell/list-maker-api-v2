import { NextFunction } from 'express';
import { IHttpActionResult } from 'inversify-express-utils';

export interface IListController {
	getLists(
		page: string | undefined,
		limit: string | undefined,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	getListById(
		id: string,
		body: any,
		listItems: string,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	createList(
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	putListById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	patchListById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;

	deleteListById(
		id: string,
		body: any,
		next: NextFunction
	): Promise<IHttpActionResult | void>;
}
