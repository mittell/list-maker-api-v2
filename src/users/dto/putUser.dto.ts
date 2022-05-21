import 'reflect-metadata';
import { injectable } from 'inversify';
import { IUserPutDto } from '../interfaces/userPutDto.interface';
import { isEmpty } from '../../common/helpers/utils.helpers';

@injectable()
export class PutUserDto implements IUserPutDto {
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

	mapFromRequest(requestId: string, model: any): Promise<IUserPutDto> {
		return new Promise<IUserPutDto>(async (resolve, reject) => {
			let id: string = requestId;
			let email: string = model.email;
			let username: string = model.username;
			let password: string = model.password;

			if (
				isEmpty(id) ||
				isEmpty(email) ||
				isEmpty(username) ||
				isEmpty(password)
			) {
				reject('Unable to map Dto from Request.');
			}

			this._id = id;
			this._email = email;
			this._username = username;
			this._password = password;

			resolve(this);
		});
	}
}
