import 'reflect-metadata';
import { injectable } from 'inversify';
import { IReturnUserDto } from '../interfaces/dto/returnUserDto.interface';
import { IUserModel } from '../interfaces/model/userModel.interface';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';

@injectable()
export class ReturnUserDto implements IReturnUserDto {
	private _id!: string;
	private _email!: string;
	private _username!: string;
	private _password!: string;

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

	async mapFromModel(model: IUserModel): Promise<IReturnUserDto> {
		let id: string = model.id;
		let email: string = model.email;
		let username: string = model.username;
		let password: string = model.password;

		if (
			isEmpty(id) ||
			isEmpty(email) ||
			isEmpty(username) ||
			isEmpty(password)
		) {
			throw new MappingError('Unable to map Dto from Model.');
		}

		this._id = id;
		this._email = email;
		this._username = username;
		this._password = password;

		return this;
	}
}
