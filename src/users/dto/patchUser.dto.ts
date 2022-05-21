import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { IUserPatchDto } from '../interfaces/userPatchDto.interface';

@injectable()
export class PatchUserDto implements IUserPatchDto {
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

	mapFromRequest(requestId: string, model: any): Promise<IUserPatchDto> {
		return new Promise<IUserPatchDto>(async (resolve, _reject) => {
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

			resolve(this);
		});
	}
}
