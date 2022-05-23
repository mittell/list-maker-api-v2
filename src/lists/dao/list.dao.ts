import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IContext } from '../../common/context/context.interface';
import { IListModel } from '../interfaces/listModel.interface';
import { IListDao } from '../interfaces/listDao.interface';
import { ICreateListDto } from '../interfaces/createListDto.interface';
import { IPutListDto } from '../interfaces/putListDto.interface';
import { IPatchListDto } from '../interfaces/patchListDto.interface';

@injectable()
export class ListDao implements IListDao {
	private _dbContext: IContext;
	private _listModel: IListModel;
	private _schema: any;

	private defaultPage: number = 0;
	private defaultLimit: number = 10;

	public constructor(
		@inject(TYPES.IContext) dbContext: IContext,
		@inject(TYPES.IListModel) listModel: IListModel
	) {
		this._dbContext = dbContext;
		this._listModel = listModel;
		this._schema = this._listModel.getModel(this._dbContext);
	}

	async getList(): Promise<IListModel[]> {
		return this._schema.find().exec();
	}

	async getListWithPageLimit(
		limit: number = this.defaultLimit,
		page: number = this.defaultPage
	): Promise<IListModel[]> {
		return this._schema
			.find()
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	getListByUserId(
		userId: string,
		limit: number = this.defaultLimit,
		page: number = this.defaultPage
	): Promise<IListModel[]> {
		return this._schema
			.find({ _userId: userId })
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	async getById(id: string): Promise<IListModel> {
		return this._schema.findOne({ _id: id }).exec();
	}

	getByIdAndUserId(id: string, userId: string): Promise<IListModel> {
		return this._schema.findOne({ _id: id, _userId: userId }).exec();
	}

	async create(dto: ICreateListDto): Promise<IListModel> {
		return await this._listModel.mapFromCreateDto(dto).then(async () => {
			return this._schema
				.create({
					...this._listModel,
				})
				.then((item: any) => {
					return item.save();
				});
		});
	}

	async update(dto: IPutListDto | IPatchListDto): Promise<IListModel> {
		return await this._listModel.mapFromUpdateDto(dto).then(async () => {
			return this._schema
				.findOneAndUpdate({ _id: dto.id }, { $set: dto }, { new: true })
				.exec();
		});
	}

	async delete(id: string): Promise<IListModel> {
		return this._schema.deleteOne({ _id: id }).exec();
	}
}
