import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { IUserCreateDto } from '../interfaces/userCreateDto.interface';

@injectable()
export class CreateUserDto implements IUserCreateDto {
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

	mapFromRequest(model: any): Promise<IUserCreateDto> {
		return new Promise<IUserCreateDto>(async (resolve, reject) => {
			let email: string = model.email;
			let username: string = model.username;
			let password: string = model.password;

			if (isEmpty(email) || isEmpty(username) || isEmpty(password)) {
				reject('Unable to map Dto from Request.');
			}

			this._email = email;
			this._username = username;
			this._password = password;

			resolve(this);
		});
	}
}
