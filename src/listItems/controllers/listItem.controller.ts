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
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IListItemController } from '../interfaces/listItemController.interface';
import { IListItemService } from '../interfaces/listItemService.interface';
import { ReturnListItemDto } from '../dto/returnListItem.dto';
import { CreateListItemDto } from '../dto/createListItem.dto';
import { PutListItemDto } from '../dto/putListItem.dto';
import { PatchListItemDto } from '../dto/patchListItem.dto';
import { NotFoundError } from '../../common/types/error.types';

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

	@httpGet('/:id', TYPES.IVerifyJsonWebTokenMiddleware)
	async getListItemById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId = body.jwt.userId;

		return (
			this._listItemService
				// Get ListItem by Id
				.getListItemByIdAndUserId(id, userId)
				// Map ListItem to DTO
				.then(async (listItem) => {
					return new ReturnListItemDto().mapFromModel(listItem);
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

	@httpPost('/')
	async createListItem(
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId = body.jwt.userId;

		return (
			new CreateListItemDto()
				// Create DTO from Request
				.mapFromRequest(body)
				// Create ListItem from DTO
				.then(async (requestDto) => {
					requestDto.userId = userId;
					return this._listItemService.createListItem(requestDto);
				})
				// Map new ListItem to DTO
				.then((listItem) => {
					return new ReturnListItemDto().mapFromModel(listItem);
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
	async putListItemById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId = body.jwt.userId;

		// Check if ListItem exists
		let existingListItem =
			await this._listItemService.getListItemByIdAndUserId(id, userId);

		// If ListItem does not exist, return NotFoundError
		if (!existingListItem) {
			return next(new NotFoundError());
		}

		return (
			new PutListItemDto()
				// Create DTO from Request
				.mapFromRequest(id, body)
				// Update ListItem from DTO
				.then(async (requestDto) => {
					return this._listItemService.updateListItem(requestDto);
				})
				// Map updated ListItem to DTO
				.then((listItem) => {
					return new ReturnListItemDto().mapFromModel(listItem);
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
	async patchListItemById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId = body.jwt.userId;

		// Check if ListItem exists
		let existingListItem =
			await this._listItemService.getListItemByIdAndUserId(id, userId);

		// If ListItem does not exist, return NotFoundError
		if (!existingListItem) {
			return next(new NotFoundError());
		}

		return (
			new PatchListItemDto()
				// Create DTO from Request
				.mapFromRequest(id, body)
				// Update ListItem from DTO
				.then(async (requestDto) => {
					return this._listItemService.updateListItem(requestDto);
				})
				// Map updated ListItem to DTO
				.then((listItem) => {
					return new ReturnListItemDto().mapFromModel(listItem);
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
	async deleteListItemById(
		@requestParam('id') id: string,
		@requestBody() body: any,
		@next() next: NextFunction
	): Promise<IHttpActionResult | void> {
		// Get UserId from validated JWT
		let userId = body.jwt.userId;

		// Check if ListItem exists
		let existingListItem =
			await this._listItemService.getListItemByIdAndUserId(id, userId);

		// If ListItem does not exist, return NotFoundError
		if (!existingListItem) {
			return next(new NotFoundError());
		}

		return (
			this._listItemService
				// Delete ListItem by Id
				.deleteListItem(id)
				// Return OK Response
				.then(() => {
					return this.ok();
				})
				// Catch and return Error
				.catch((error) => {
					return next(error);
				})
		);
	}
}
