import 'reflect-metadata';
import { injectable } from 'inversify';
import { IModel } from '../../common/interfaces/model.interface';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { CreateUserDto } from '../dto/createUser.dto';
import { PutUserDto } from '../dto/putUser.dto';
import { PatchUserDto } from '../dto/patchUser.dto';
import { isEmpty } from '../../common/helpers/utils.helpers';

@injectable()
export class UserModel implements IModel {
	@prop({ required: true })
	private _id!: string;

	@prop({ required: true })
	private _email!: string;

	@prop({ required: true })
	private _username!: string;

	@prop({ required: true })
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

	public set email(value: string) {
		this._email = value;
	}

	public get username() {
		return this._username;
	}

	public set username(value: string) {
		this._username = value;
	}

	public get password() {
		return this._password;
	}

	public set password(value: string) {
		this._password = value;
	}

	public getModel(dbContext: any): any {
		return getModelForClass(UserModel, {
			existingMongoose: dbContext.connection,
			schemaOptions: {
				collection: 'users',
				_id: true,
				timestamps: true,
				toObject: { virtuals: true },
			},
		});
	}

	public async mapFromCreateDto(dto: CreateUserDto): Promise<any> {
		return new Promise(async (resolve, reject) => {
			if (
				isEmpty(dto.id) ||
				isEmpty(dto.email) ||
				isEmpty(dto.username) ||
				isEmpty(dto.password)
			) {
				reject('Unable to map from CreateDto.');
			}

			this._id = dto.id;
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
