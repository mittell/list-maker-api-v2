import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IUserDao } from '../interfaces/userDao.interface';
import { IUserService } from '../interfaces/userService.interface';
import { v4 as uuid } from 'uuid';
import { IUserCreateDto } from '../interfaces/userCreateDto.interface';
import { IUserModel } from '../interfaces/userModel.interface';
import { IUserPutDto } from '../interfaces/userPutDto.interface';
import { IUserPatchDto } from '../interfaces/userPatchDto.interface';

@injectable()
export class UserService implements IUserService {
	private _userDao: IUserDao;

	constructor(@inject(TYPES.IUserDao) userDao: IUserDao) {
		this._userDao = userDao;
	}

	async getUserList(): Promise<IUserModel[]> {
		return this._userDao.getList();
	}

	async getUserById(id: string): Promise<IUserModel> {
		return await this._userDao.getById(id);
	}

	async createUser(dto: IUserCreateDto): Promise<IUserModel> {
		dto.id = uuid();
		return await this._userDao.create(dto);
	}

	async updateUser(dto: IUserPutDto | IUserPatchDto): Promise<IUserModel> {
		return await this._userDao.update(dto);
	}

	async deleteUser(id: string): Promise<IUserModel> {
		return await this._userDao.delete(id);
	}
}
