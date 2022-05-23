import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	request,
	requestParam,
	requestBody,
	response,
	httpGet,
	httpPost,
	httpPut,
	httpPatch,
	httpDelete,
	BaseHttpController,
	IHttpActionResult,
	next,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IListItemController } from '../interfaces/listItemController.interface';
import { IListItemService } from '../interfaces/listItemService.interface';
import { ReturnListItemDto } from '../dto/returnListItem.dto';
import { CreateListItemDto } from '../dto/createListItem.dto';
import { PutListItemDto } from '../dto/putListItem.dto';
import { PatchListItemDto } from '../dto/patchListItem.dto';

@controller('/listItems')
export class ListItemController
	extends BaseHttpController
	implements IListItemController
{
	private _listItemService: IListItemService;

	public constructor(
		@inject(TYPES.IListItemService) listItemService: IListItemService
	) {
		super();
		this._listItemService = listItemService;
	}

	@httpGet('/', TYPES.IVerifyJsonWebTokenMiddleware)
	async getListItems(
		@requestBody() _body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// let userId = body.jwt.userId;

		return await this._listItemService
			.getListItems()
			.then((model) => {
				return Promise.all(
					Array.from(model, async (item) => {
						return await new ReturnListItemDto().mapFromModel(item);
					})
				);
			})
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpGet(
		'/:id',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyPermissionMiddleware
	)
	async getListItemById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._listItemService
			.getListItemById(id)
			.then(async (model) => {
				return await new ReturnListItemDto().mapFromModel(model);
			})
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost('/')
	async createListItem(
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		let userId = body.jwt.userId;
		return new CreateListItemDto()
			.mapFromRequest(body)
			.then(async (requestDto) => {
				requestDto.userId = userId;
				return this._listItemService.createListItem(requestDto);
			})
			.then((model) => {
				return new ReturnListItemDto().mapFromModel(model);
			})
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPut(
		'/:id',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyPermissionMiddleware
	)
	async putListItemById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return new PutListItemDto()
			.mapFromRequest(id, body)
			.then(async (requestDto) => {
				return this._listItemService.updateListItem(requestDto);
			})
			.then((model) => {
				return new ReturnListItemDto().mapFromModel(model);
			})
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPatch(
		'/:id',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyPermissionMiddleware
	)
	async patchListItemById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return new PatchListItemDto()
			.mapFromRequest(id, body)
			.then(async (requestDto) => {
				return this._listItemService.updateListItem(requestDto);
			})
			.then((model) => {
				return new ReturnListItemDto().mapFromModel(model);
			})
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpDelete(
		'/:id',
		TYPES.IVerifyJsonWebTokenMiddleware,
		TYPES.IVerifyPermissionMiddleware
	)
	async deleteListItemById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._listItemService
			.deleteListItem(id)
			.then(() => {
				return this.ok();
			})
			.catch((error) => {
				return next(error);
			});
	}
}
