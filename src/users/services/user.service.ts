import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ICreateDto } from '../../common/interfaces/createDto.interface';
import { IModel } from '../../common/interfaces/model.interface';
import { IPatchDto } from '../../common/interfaces/patchDto.interface';
import { IPutDto } from '../../common/interfaces/putDto.interface';
import { TYPES } from '../../common/types/di.types';
import { IUserDao } from '../interfaces/userDao.interface';
import { IUserService } from '../interfaces/userService.interface';
import { v4 as uuid } from 'uuid';

@injectable()
export class UserService implements IUserService {
	private _userDao: IUserDao;

	constructor(@inject(TYPES.IUserDao) userDao: IUserDao) {
		this._userDao = userDao;
	}

	getUserList(): Promise<IModel[]> {
		return new Promise<IModel[]>(async (resolve, reject) => {
			let result: IModel[] = await this._userDao.getList();

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	getUserById(id: string): Promise<IModel> {
		return new Promise<IModel>(async (resolve, reject) => {
			let result: IModel = await this._userDao.getById(id);

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	createUser(dto: ICreateDto): Promise<IModel> {
		return new Promise<IModel>(async (resolve, reject) => {
			dto.id = uuid();
			console.log('DTO TO DAO');
			console.log(dto);
			let result: IModel = await this._userDao.create(dto);
			console.log(result);
			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	updateUser(dto: IPutDto | IPatchDto): Promise<IModel> {
		return new Promise<IModel>(async (resolve, reject) => {
			let result: IModel = await this._userDao.update(dto);

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	deleteUser(id: string): Promise<IModel> {
		return new Promise<IModel>(async (resolve, reject) => {
			let result: IModel = await this._userDao.delete(id);

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}
}
