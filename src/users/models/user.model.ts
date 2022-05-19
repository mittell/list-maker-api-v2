import 'reflect-metadata';
import { injectable } from 'inversify';
import { IModel } from '../../common/interfaces/model.interface';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { CreateUserDto } from '../dto/createUser.dto';
import { PutUserDto } from '../dto/putUser.dto';
import { PatchUserDto } from '../dto/patchUser.dto';
import { isEmpty } from '../../common/helpers/utils.helpers';

@injectable()
@modelOptions({
	schemaOptions: {
		_id: true,
		timestamps: true,
		toObject: { virtuals: true },
	},
})
export class UserModel implements IModel {
	@prop()
	private _id: string;

	@prop({ type: () => String, required: true })
	private _email: string;

	@prop({ type: () => String, required: true })
	private _username: string;

	@prop({ type: () => String, required: true })
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

	public async getModel(): Promise<any> {
		return Promise.resolve(getModelForClass(UserModel));
	}

	public async mapFromCreateDto(dto: CreateUserDto): Promise<any> {
		return new Promise(async (resolve, reject) => {
			if (
				isEmpty(dto.email) ||
				isEmpty(dto.username) ||
				isEmpty(dto.password)
			) {
				reject('Unable to map from CreateDto.');
			}

			this._email = dto.email;
			this._username = dto.username;
			this._password = dto.password;

			resolve(UserModel);
		});
	}

	public async mapFromPutDto(dto: PutUserDto): Promise<any> {
		return new Promise(async (resolve, reject) => {
			if (
				isEmpty(dto.email) ||
				isEmpty(dto.username) ||
				isEmpty(dto.password)
			) {
				reject('Unable to map from PutDto.');
			}

			this._email = dto.email;
			this._username = dto.username;
			this._password = dto.password;

			resolve(UserModel);
		});
	}

	public async mapFromPatchDto(dto: PatchUserDto): Promise<any> {
		return new Promise(async (resolve, _reject) => {
			if (!isEmpty(dto.email)) {
				this._email = dto.email as string;
			}

			if (!isEmpty(dto.username)) {
				this._username = dto.username as string;
			}

			if (!isEmpty(dto.password)) {
				this._password = dto.password as string;
			}

			resolve(UserModel);
		});
	}
}
