import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IModel } from '../../common/interfaces/model.interface';
import { TYPES } from '../../common/types/di.types';
import { IUserDao } from '../interfaces/userDao.interface';
import { IUserService } from '../interfaces/userService.interface';

@injectable()
export class UserService implements IUserService {
	private _userDao: IUserDao;

	constructor(@inject(TYPES.IUserDao) userDao: IUserDao) {
		this._userDao = userDao;
	}

	public getUserList(): Promise<IModel[]> {
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

	//@ts-ignore
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

	//@ts-ignore
	createUser(model: IModel): Promise<IModel> {
		throw new Error('Method not implemented.');
	}

	//@ts-ignore
	updateUser(model: IModel): Promise<IModel> {
		throw new Error('Method not implemented.');
	}

	//@ts-ignore
	deleteUser(id: string): Promise<IModel> {
		throw new Error('Method not implemented.');
	}
}
