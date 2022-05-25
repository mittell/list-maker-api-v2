import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { IPatchUserDto } from '../interfaces/dto/patchUserDto.interface';

@injectable()
export class PatchUserDto implements IPatchUserDto {
	private _id: string | undefined;
	private _email: string | undefined;
	private _username: string | undefined;
	private _password: string | undefined;

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

	async mapFromRequest(
		requestId: string,
		model: any
	): Promise<IPatchUserDto> {
		let id: string = requestId;
		let email: string | undefined = model.email;
		let username: string | undefined = model.username;
		let password: string | undefined = model.password;

		if (!isEmpty(id)) {
			this._id = id;
		}

		if (!isEmpty(email)) {
			this._email = email;
		}

		if (!isEmpty(username)) {
			this._username = username;
		}

		if (!isEmpty(password)) {
			this._password = password;
		}

		return this;
	}
}
