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
	queryParam,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IListController } from '../interfaces/listController.interface';
import { IListService } from '../interfaces/listService.interface';
import { ReturnListDto } from '../dto/returnList.dto';
import { CreateListDto } from '../dto/createList.dto';
import { PutListDto } from '../dto/putList.dto';
import { PatchListDto } from '../dto/patchList.dto';

@controller('/lists')
export class ListController
	extends BaseHttpController
	implements IListController
{
	private _listService: IListService;

	public constructor(@inject(TYPES.IListService) listService: IListService) {
		super();
		this._listService = listService;
	}

	@httpGet('/', TYPES.IVerifyJsonWebTokenMiddleware)
	async getLists(
		@requestBody() body: any,
		@queryParam() page: string | undefined,
		@queryParam() limit: string | undefined,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		let userId = body.jwt.userId;
		let parsedLimit: number | undefined = limit
			? parseInt(limit)
			: undefined;
		let parsedPage: number | undefined = page ? parseInt(page) : undefined;

		return await this._listService
			.getListsByUserId(userId, parsedLimit, parsedPage)
			.then((model) => {
				return Promise.all(
					Array.from(model, async (item) => {
						return await new ReturnListDto().mapFromModel(item);
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
	async getListById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._listService
			.getListById(id)
			.then(async (model) => {
				return await new ReturnListDto().mapFromModel(model);
			})
			.then((returnDto) => {
				return this.json(returnDto);
			})
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost('/')
	async createList(
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		let userId = body.jwt.userId;

		return new CreateListDto()
			.mapFromRequest(body)
			.then(async (requestDto) => {
				requestDto.userId = userId;
				return this._listService.createList(requestDto);
			})
			.then((model) => {
				return new ReturnListDto().mapFromModel(model);
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
	async putListById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return new PutListDto()
			.mapFromRequest(id, body)
			.then(async (requestDto) => {
				return this._listService.updateList(requestDto);
			})
			.then((model) => {
				return new ReturnListDto().mapFromModel(model);
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
	async patchListById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return new PatchListDto()
			.mapFromRequest(id, body)
			.then(async (requestDto) => {
				return this._listService.updateList(requestDto);
			})
			.then((model) => {
				return new ReturnListDto().mapFromModel(model);
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
	async deleteListById(
		@requestParam('id') id: string,
		@request() _req: Request,
		@response() _res: Response,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		return await this._listService
			.deleteList(id)
			.then(() => {
				return this.ok();
			})
			.catch((error) => {
				return next(error);
			});
	}
}
