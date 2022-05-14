import { IService } from './service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class DummyService implements IService {
	private _dbConnection: string = 'Fake DB';

	// constructor(dbConnection: string) {
	// 	this._dbConnection = dbConnection;
	// }

	async getDummy(id: number): Promise<string> {
		const result = new Promise<string>((resolve, _reject) => {
			resolve(`Here is ${id} from ${this._dbConnection}`);
		});

		return result;
	}
}
