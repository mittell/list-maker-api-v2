import 'reflect-metadata';
import { injectable } from 'inversify';
import { IModel } from '../../common/interfaces/model.interface';
import { IUserPutDto } from '../interfaces/userPutDto.interface';

@injectable()
export class PutUserDto implements IUserPutDto {
	private _id: string;
	private _email: string;
	private _username: string;
	private _password: string;

	constructor(id: string, email: string, username: string, password: string) {
		this._id = id;
		this._email = email;
		this._username = username;
		this._password = password;
	}

	public get id() {
		return this._id;
	}

	public get email() {
		return this._email;
	}

	public get username() {
		return this._username;
	}

	public get password() {
		return this._password;
	}

	//@ts-ignore
	mapFromRequest(model: any): Promise<void> {
		throw new Error('Method not implemented.');
	}

	//@ts-ignore
	mapFromModel(model: IModel): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
