import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IContext } from '../../common/context/context.interface';
import { IUserDao } from '../interfaces/dao/userDao.interface';
import { IUserModel } from '../interfaces/model/userModel.interface';
import { ICreateUserDto } from '../interfaces/dto/createUserDto.interface';
import { IPutUserDto } from '../interfaces/dto/putUserDto.interface';
import { IPatchUserDto } from '../interfaces/dto/patchUserDto.interface';

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

	async getByEmail(email: string): Promise<IUserModel> {
		return this._schema.findOne({ _email: email }).exec();
	}

	async create(dto: ICreateUserDto): Promise<IUserModel> {
		return await this._userModel.mapFromCreateDto(dto).then(async () => {
			return this._schema
				.create({
					...this._userModel,
				})
				.then((item: any) => {
					return item.save();
				});
		});
	}

	async update(dto: IPutUserDto | IPatchUserDto): Promise<IUserModel> {
		return await this._userModel.mapFromUpdateDto(dto).then(async () => {
			return this._schema
				.findOneAndUpdate({ _id: dto.id }, { $set: dto }, { new: true })
				.exec();
		});
	}

	async delete(id: string): Promise<IUserModel> {
		return this._schema.deleteOne({ _id: id }).exec();
	}
}
