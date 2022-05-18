import { IService } from './service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IContext } from '../context/context.interface';
import { TYPES } from '../../common/types/di.types';
import { UserModel } from '../models/dummy.model';

@injectable()
export class DummyService implements IService {
	private _dbConnection: string = 'Fake DB';

	private _dbContext: IContext;

	constructor(@inject(TYPES.IContext) dbContext: IContext) {
		this._dbContext = dbContext;
	}

	public getUser(): Promise<UserModel> {
		return new Promise<UserModel>(async (resolve, reject) => {
			let result = await this._dbContext.find('test', {});

			if (result) {
				resolve(result);
			} else {
				reject();
			}

			return result;
		});
	}

	async getDummy(id: number): Promise<string> {
		return Promise.resolve(`Here is ${id} from ${this._dbConnection}`);
	}
}
