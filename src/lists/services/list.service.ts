import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { ICreateListDto } from '../interfaces/dto/createListDto.interface';
import { IListDao } from '../interfaces/dao/listDao.interface';
import { IListModel } from '../interfaces/model/listModel.interface';
import { IPatchListDto } from '../interfaces/dto/patchListDto.interface';
import { IPutListDto } from '../interfaces/dto/putListDto.interface';
import { v4 as uuid } from 'uuid';
import { IListService } from '../interfaces/service/listService.interface';

@injectable()
export class ListService implements IListService {
	private _listDao: IListDao;

	constructor(@inject(TYPES.IListDao) listDao: IListDao) {
		this._listDao = listDao;
	}

	async getLists(limit: number, page: number): Promise<IListModel[]> {
		return this._listDao.getListWithPageLimit(limit, page);
	}

	async getListsByUserId(
		userId: string,
		limit: number | undefined,
		page: number | undefined
	): Promise<IListModel[]> {
		return this._listDao.getListByUserId(userId, limit, page);
	}

	async getListById(id: string): Promise<IListModel> {
		return this._listDao.getById(id);
	}

	async getListByIdAndUserId(
		id: string,
		userId: string
	): Promise<IListModel> {
		return this._listDao.getByIdAndUserId(id, userId);
	}

	async createList(dto: ICreateListDto): Promise<IListModel> {
		dto.id = uuid();
		return this._listDao.create(dto);
	}

	async updateList(dto: IPutListDto | IPatchListDto): Promise<IListModel> {
		return this._listDao.update(dto);
	}

	async deleteList(id: string): Promise<IListModel> {
		return this._listDao.delete(id);
	}
}
