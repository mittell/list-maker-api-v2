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
		return new Promise<IUserModel[]>(async (resolve, reject) => {
			return this._userDao.getList().then((data) => {
				if (data) {
					resolve(data);
				}
				reject();
			});
		});
	}

	async getUserById(id: string): Promise<IUserModel> {
		return new Promise<IUserModel>(async (resolve, reject) => {
			let result: IUserModel = await this._userDao.getById(id);

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	async createUser(dto: IUserCreateDto): Promise<IUserModel> {
		return new Promise<IUserModel>(async (resolve, reject) => {
			dto.id = uuid();
			let result: IUserModel = await this._userDao.create(dto);
			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	async updateUser(dto: IUserPutDto | IUserPatchDto): Promise<IUserModel> {
		return new Promise<IUserModel>(async (resolve, reject) => {
			let result: IUserModel = await this._userDao.update(dto);

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	async deleteUser(id: string): Promise<IUserModel> {
		return new Promise<IUserModel>(async (resolve, reject) => {
			let result: IUserModel = await this._userDao.delete(id);

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}
}
