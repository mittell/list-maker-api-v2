import { IDto } from '../../common/interfaces/dto.interface';
import { IModel } from '../../common/interfaces/model.interface';

export class CreateUserDto implements IDto {
	private _email: string;
	private _username: string;
	private _password: string;

	constructor(email: string, username: string, password: string) {
		this._email = email;
		this._username = username;
		this._password = password;
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
