import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserModel implements IModel {
	constructor(
		public email: string,
		public name: string,
		public _id?: string | undefined
	) {}
}
