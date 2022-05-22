import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../common/types/di.types';
import { IUserDao } from '../interfaces/userDao.interface';
import { IUserService } from '../interfaces/userService.interface';
import { v4 as uuid } from 'uuid';
import { ICreateUserDto } from '../interfaces/createUserDto.interface';
import { IUserModel } from '../interfaces/userModel.interface';
import { IPutUserDto } from '../interfaces/putUserDto.interface';
import { IPatchUserDto } from '../interfaces/patchUserDto.interface';
import argon2 from 'argon2';

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
		return this._userDao.getById(id);
	}

	async getUserByEmail(email: string): Promise<IUserModel> {
		return this._userDao.getByEmail(email);
	}

	async createUser(dto: ICreateUserDto): Promise<IUserModel> {
		dto.id = uuid();
		dto.password = await argon2.hash(dto.password);
		return this._userDao.create(dto);
	}

	async updateUser(dto: IPutUserDto | IPatchUserDto): Promise<IUserModel> {
		return this._userDao.update(dto);
	}

	async deleteUser(id: string): Promise<IUserModel> {
		return this._userDao.delete(id);
	}
}
