import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { ICreateUserDto } from '../interfaces/dto/createUserDto.interface';
import { MappingError } from '../../common/types/error.types';

@injectable()
export class CreateUserDto implements ICreateUserDto {
	private _id!: string;
	private _email!: string;
	private _username!: string;
	private _password!: string;

	public get id() {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
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

	public set password(value: string) {
		this._password = value;
	}

	async mapFromRequest(model: any): Promise<ICreateUserDto> {
		let email: string = model.email;
		let username: string = model.username;
		let password: string = model.password;

		if (isEmpty(email) || isEmpty(username) || isEmpty(password)) {
			throw new MappingError('Unable to map Dto from Request.');
		}

		this._email = email;
		this._username = username;
		this._password = password;

		return this;
	}
}
