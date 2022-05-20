import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IContext } from '../../common/context/context.interface';
import { IUserDao } from '../interfaces/userDao.interface';
import { IUserModel } from '../interfaces/userModel.interface';
import { IUserCreateDto } from '../interfaces/userCreateDto.interface';
import { IUserPutDto } from '../interfaces/userPutDto.interface';
import { IUserPatchDto } from '../interfaces/userPatchDto.interface';

@injectable()
export class UserDao implements IUserDao {
	private _dbContext: IContext;
	private _userModel: IUserModel;
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
		return this._schema.find().exec();
	}

	async getById(id: string): Promise<IUserModel> {
		return this._schema.findOne({ _id: id }).exec();
	}

	async create(dto: IUserCreateDto): Promise<IUserModel> {
		return await this._userModel.mapFromCreateDto(dto).then(async () => {
			console.log(this._userModel);
			let item = new this._schema({
				_email: this._userModel.email,
				_username: this._userModel.username,
				_password: this._userModel.password,
			});
			await item.save();

			return item;
		});
	}

	async update(dto: IUserPutDto | IUserPatchDto): Promise<IUserModel> {
		return this._schema
			.findOneAndUpdate({ _id: dto.id }, { $set: dto }, { new: true })
			.exec();
	}

	async delete(id: string): Promise<IUserModel> {
		return this._schema.deleteOne({ _id: id }).exec();
	}
}
