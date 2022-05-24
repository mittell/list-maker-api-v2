import { IDao } from '../../common/interfaces/base/dao.interface';
import { ICreateUserDto } from './createUserDto.interface';
import { IUserModel } from './userModel.interface';
import { IPatchUserDto } from './patchUserDto.interface';
import { IPutUserDto } from './putUserDto.interface';

export interface IUserDao extends IDao {
	getList(): Promise<IUserModel[]>;

	getById(id: string): Promise<IUserModel>;

	getByEmail(email: string): Promise<IUserModel>;

	create(dto: ICreateUserDto): Promise<IUserModel>;

	update(dto: IPutUserDto | IPatchUserDto): Promise<IUserModel>;
	
	delete(id: string): Promise<IUserModel>;
}
