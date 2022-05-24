import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IContext } from '../../common/context/context.interface';
import { IListItemDao } from '../interfaces/listItemDao.interface';
import { IListItemModel } from '../interfaces/listItemModel.interface';
import { ICreateListItemDto } from '../interfaces/createListItemDto.interface';
import { IPutListItemDto } from '../interfaces/putListItemDto.interface';
import { IPatchListItemDto } from '../interfaces/patchListItemDto.interface';

@injectable()
export class ListItemDao implements IListItemDao {
	private _dbContext: IContext;
	private _listItemModel: IListItemModel;
	private _schema: any;

	public constructor(
		@inject(TYPES.IContext) dbContext: IContext,
		@inject(TYPES.IListItemModel) listItemModel: IListItemModel
	) {
		this._dbContext = dbContext;
		this._listItemModel = listItemModel;
		this._schema = this._listItemModel.getModel(this._dbContext);
	}

	async getList(): Promise<IListItemModel[]> {
		return this._schema.find().exec();
	}

	async getListByUserId(userId: string): Promise<IListItemModel[]> {
		return this._schema.find({ _userId: userId }).exec();
	}

	async getListByListId(listId: string): Promise<IListItemModel[]> {
		return this._schema.find({ _listId: listId }).exec();
	}

	async getListByUserIdAndListId(
		userId: string,
		listId: string
	): Promise<IListItemModel[]> {
		return this._schema.find({ _listId: listId, _userId: userId }).exec();
	}

	async getById(id: string): Promise<IListItemModel> {
		return this._schema.findOne({ _id: id }).exec();
	}

	async getByIdAndUserId(
		id: string,
		userId: string
	): Promise<IListItemModel> {
		return this._schema.findOne({ _id: id, _userId: userId }).exec();
	}

	async create(dto: ICreateListItemDto): Promise<IListItemModel> {
		return this._listItemModel.mapFromCreateDto(dto).then(async () => {
			return this._schema
				.create({
					...this._listItemModel,
				})
				.then((item: any) => {
					return item.save();
				});
		});
	}

	async update(
		dto: IPutListItemDto | IPatchListItemDto
	): Promise<IListItemModel> {
		return this._listItemModel.mapFromUpdateDto(dto).then(async () => {
			return this._schema
				.findOneAndUpdate({ _id: dto.id }, { $set: dto }, { new: true })
				.exec();
		});
	}

	async delete(id: string): Promise<IListItemModel> {
		return this._schema.deleteOne({ _id: id }).exec();
	}
}
