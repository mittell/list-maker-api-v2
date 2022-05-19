import { IDto } from '../../common/interfaces/dto.interface';
import { IModel } from '../../common/interfaces/model.interface';

export class PutUserDto implements IDto {
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

	mapFromModel(model: IModel): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
