import { injectable } from 'inversify';
import { IModel } from '../../common/interfaces/model.interface';
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

	//@ts-ignore
	mapFromRequest(model: any): Promise<void> {
		throw new Error('Method not implemented.');
	}

	//@ts-ignore
	mapFromModel(model: IModel): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
