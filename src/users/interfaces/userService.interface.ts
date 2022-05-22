import { ICreateUserDto } from './createUserDto.interface';
import { IUserModel } from './userModel.interface';
import { IPatchUserDto } from './patchUserDto.interface';
import { IPutUserDto } from './putUserDto.interface';

export interface IUserService {
	getUserList(): Promise<IUserModel[]>;

	getUserById(id: string): Promise<IUserModel>;

	getUserByEmail(id: string): Promise<IUserModel>;

	createUser(dto: ICreateUserDto): Promise<IUserModel>;

	updateUser(dto: IPatchUserDto | IPutUserDto): Promise<IUserModel>;

	deleteUser(id: string): Promise<IUserModel>;
}
