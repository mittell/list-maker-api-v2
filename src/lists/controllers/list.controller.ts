import { NextFunction } from 'express';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	requestParam,
	requestBody,
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
import { IListItemService } from '../../listItems/interfaces/listItemService.interface';
import { ReturnListItemDto } from '../../listItems/dto/returnListItem.dto';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { NotFoundError } from '../../common/types/error.types';

@controller('/lists')
export class ListController
	extends BaseHttpController
	implements IListController
{
	private _listService: IListService;
	private _listItemService: IListItemService;

	public constructor(
		@inject(TYPES.IListService) listService: IListService,
		@inject(TYPES.IListItemService) listItemService: IListItemService
	) {
		super();
		this._listService = listService;
		this._listItemService = listItemService;
	}

	@httpGet('/', TYPES.IVerifyJsonWebTokenMiddleware)
	async getLists(
		@queryParam('page') page: string | undefined,
		@queryParam('limit') limit: string | undefined,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId: string = body.jwt.userId;

		// Parse submitted Limit and Page values
		let parsedLimit: number | undefined = limit
			? parseInt(limit)
			: undefined;
		let parsedPage: number | undefined = page ? parseInt(page) : undefined;

		return (
			this._listService
				// Get Lists by UserId
				.getListsByUserId(userId, parsedLimit, parsedPage)
				// Map each List to a DTO, and return as an Array
				.then((lists) => {
					return Promise.all(
						Array.from(lists, async (list) => {
							return await new ReturnListDto().mapFromModel(list);
						})
					);
				})
				// Return DTO
				.then((returnDto) => {
					return this.json(returnDto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpGet('/:id', TYPES.IVerifyJsonWebTokenMiddleware)
	async getListById(
		@requestParam('id') id: string,
		@queryParam('listItems') listItems: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId: string = body.jwt.userId;

		// Parse submitted ListItems value
		let parsedListItems =
			!isEmpty(listItems) && listItems.toLowerCase() === 'true'
				? true
				: false;

		return await this._listService
			// Get List by Id
			.getListByIdAndUserId(id, userId)
			// Map List to DTO
			.then(async (list) => {
				let listDto = await new ReturnListDto().mapFromModel(list);
				// Check for parsed ListItems value
				if (parsedListItems) {
					await this._listItemService
						// Get ListItems by ListId
						.getListItemsByListId(listDto.id)
						// Map each ListItem to a DTO, and return as an Array
						.then(async (items) => {
							return Promise.all(
								Array.from(items, async (item) => {
									return new ReturnListItemDto().mapFromModel(
										item
									);
								})
							);
						})
						// Add ListItems to List DTO
						.then((returnDto) => {
							listDto.listItems = returnDto;
						});
				}
				return listDto;
			})
			// Return DTO
			.then((returnDto) => {
				return this.json(returnDto);
			})
			// Catch and return Error
			.catch((error) => {
				return next(error);
			});
	}

	@httpPost('/', TYPES.IVerifyJsonWebTokenMiddleware)
	async createList(
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId = body.jwt.userId;

		return (
			new CreateListDto()
				// Create DTO from Request
				.mapFromRequest(body)
				// Create List from DTO
				.then(async (requestDto) => {
					requestDto.userId = userId;
					return this._listService.createList(requestDto);
				})
				// Map new List to DTO
				.then((list) => {
					return new ReturnListDto().mapFromModel(list);
				})
				// Return DTO
				.then((returnDto) => {
					return this.json(returnDto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpPut('/:id', TYPES.IVerifyJsonWebTokenMiddleware)
	async putListById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId: string = body.jwt.userId;

		// Check if List exists
		let existingList = await this._listService.getListByIdAndUserId(
			id,
			userId
		);

		// If List does not exist, return NotFoundError
		if (!existingList) {
			return next(new NotFoundError());
		}

		return (
			new PutListDto()
				// Create DTO from Request
				.mapFromRequest(id, body)
				// Update List from DTO
				.then(async (requestDto) => {
					return this._listService.updateList(requestDto);
				})
				// Map updated List to DTO
				.then((list) => {
					return new ReturnListDto().mapFromModel(list);
				})
				// Return DTO
				.then((returnDto) => {
					return this.json(returnDto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpPatch('/:id', TYPES.IVerifyJsonWebTokenMiddleware)
	async patchListById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId: string = body.jwt.userId;

		// Check if List exists
		let existingList = await this._listService.getListByIdAndUserId(
			id,
			userId
		);

		// If List does not exist, return NotFoundError
		if (!existingList) {
			return next(new NotFoundError());
		}

		return (
			new PatchListDto()
				// Create DTO from Request
				.mapFromRequest(id, body)
				// Update List from DTO
				.then(async (requestDto) => {
					return this._listService.updateList(requestDto);
				})
				// Map updated List to DTO
				.then((list) => {
					return new ReturnListDto().mapFromModel(list);
				})
				// Return DTO
				.then((returnDto) => {
					return this.json(returnDto);
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}

	@httpDelete('/:id', TYPES.IVerifyJsonWebTokenMiddleware)
	async deleteListById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId: string = body.jwt.userId;

		// Check if List exists
		let existingList = await this._listService.getListByIdAndUserId(
			id,
			userId
		);

		// If List does not exist, return NotFoundError
		if (!existingList) {
			return next(new NotFoundError());
		}

		return await this._listService
			// Delete List by Id
			.deleteList(id)
			// Return OK Response
			.then(() => {
				return this.ok();
			})
			// Catch and return Error
			.catch((error) => {
				return next(error);
			});
	}
}
