import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IContext } from '../../common/context/context.interface';
import { IUserDao } from '../interfaces/userDao.interface';
import { IUserModel } from '../interfaces/userModel.interface';

@injectable()
export class UserDao implements IUserDao {
	private _dbContext: any;
	private _userModel: any;
	private _schema: any;

	public constructor(
		@inject(TYPES.IContext) dbContext: IContext,
		@inject(TYPES.IUserModel) userModel: IUserModel
	) {
		this._dbContext = dbContext;
		this._userModel = userModel;
		this._schema = this._userModel.getModel(this._dbContext);
	}

	async getList(): Promise<IUserModel[]> {
		return await this._schema.find().exec();
	}

	async getById(id: string): Promise<IUserModel> {
		return await this._schema.findOne({ _id: id }).exec();
	}

	async create(model: any): Promise<IUserModel> {
		return await new this._schema({ ...model }).save().exec();
	}

	async update(model: any): Promise<IUserModel> {
		return await this._schema
			.findOneAndUpdate({ _id: model.id }, { $set: model }, { new: true })
			.exec();
	}

	async delete(id: string): Promise<IUserModel> {
		return this._schema.deleteOne({ _id: id }).exec();
	}
}
