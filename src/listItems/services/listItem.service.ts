import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { v4 as uuid } from 'uuid';
import { IListItemService } from '../interfaces/service/listItemService.interface';
import { IListItemDao } from '../interfaces/dao/listItemDao.interface';
import { IListItemModel } from '../interfaces/model/listItemModel.interface';
import { ICreateListItemDto } from '../interfaces/dto/createListItemDto.interface';
import { IPutListItemDto } from '../interfaces/dto/putListItemDto.interface';
import { IPatchListItemDto } from '../interfaces/dto/patchListItemDto.interface';

@injectable()
export class ListItemService implements IListItemService {
	private _listItemDao: IListItemDao;

	constructor(@inject(TYPES.IListItemDao) listItemDao: IListItemDao) {
		this._listItemDao = listItemDao;
	}

	async getListItems(): Promise<IListItemModel[]> {
		return this._listItemDao.getList();
	}

	async getListItemsByListId(listId: string): Promise<IListItemModel[]> {
		return this._listItemDao.getListByListId(listId);
	}

	async getListItemById(id: string): Promise<IListItemModel> {
		return this._listItemDao.getById(id);
	}

	async getListItemByIdAndUserId(
		id: string,
		userId: string
	): Promise<IListItemModel> {
		return this._listItemDao.getByIdAndUserId(id, userId);
	}

	async createListItem(dto: ICreateListItemDto): Promise<IListItemModel> {
		dto.id = uuid();
		return this._listItemDao.create(dto);
	}

	async updateListItem(
		dto: IPutListItemDto | IPatchListItemDto
	): Promise<IListItemModel> {
		return this._listItemDao.update(dto);
	}

	async deleteListItem(id: string): Promise<IListItemModel> {
		return this._listItemDao.delete(id);
	}
}
