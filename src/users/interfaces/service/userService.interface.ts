import { ICreateUserDto } from '../dto/createUserDto.interface';
import { IUserModel } from '../model/userModel.interface';
import { IPatchUserDto } from '../dto/patchUserDto.interface';
import { IPutUserDto } from '../dto/putUserDto.interface';

export interface IUserService {
	getUserList(): Promise<IUserModel[]>;

	getUserById(id: string): Promise<IUserModel>;

	getUserByEmail(id: string): Promise<IUserModel>;

	createUser(dto: ICreateUserDto): Promise<IUserModel>;

	updateUser(dto: IPatchUserDto | IPutUserDto): Promise<IUserModel>;

	deleteUser(id: string): Promise<IUserModel>;
}
