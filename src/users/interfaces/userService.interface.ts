import { IUserCreateDto } from './userCreateDto.interface';
import { IUserModel } from './userModel.interface';
import { IUserPatchDto } from './userPatchDto.interface';
import { IUserPutDto } from './userPutDto.interface';

export interface IUserService {
	getUserList(): Promise<IUserModel[]>;

	getUserById(id: string): Promise<IUserModel>;

	createUser(dto: IUserCreateDto): Promise<IUserModel>;

	updateUser(dto: IUserPatchDto | IUserPutDto): Promise<IUserModel>;

	deleteUser(id: string): Promise<IUserModel>;
}
