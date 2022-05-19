import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IDao } from '../../common/interfaces/dao.interface';
import { TYPES } from '../../common/types/di.types';
import { IModel } from '../../common/interfaces/model.interface';

@injectable()
export class UserDao implements IDao {
	private _userModel: any;

	public constructor(@inject(TYPES.IModel) userModel: IModel) {
		this._userModel = userModel.getModel();
	}

	async getList(): Promise<any[]> {
		return await this._userModel.find().exec();
	}

	async getById(id: number): Promise<any> {
		return await this._userModel.findOne({ _id: id }).exec();
	}

	async create(model: any): Promise<any> {
		return await new this._userModel({ ...model }).save().exec();
	}

	async update(model: any): Promise<any> {
		return await this._userModel
			.findOneAndUpdate({ _id: model.id }, { $set: model }, { new: true })
			.exec();
	}

	async delete(id: number): Promise<any> {
		return this._userModel.deleteOne({ _id: id }).exec();
	}
}
