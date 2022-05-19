import { IDto } from '../../common/interfaces/dto.interface';
import { IModel } from '../../common/interfaces/model.interface';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class PatchUserDto implements IDto {
	private _id?: string | undefined;
	private _email?: string | undefined;
	private _username?: string | undefined;
	private _password?: string | undefined;

	constructor(
		id?: string | undefined,
		email?: string | undefined,
		username?: string | undefined,
		password?: string | undefined
	) {
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
	mapFromModel(model: IModel): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
