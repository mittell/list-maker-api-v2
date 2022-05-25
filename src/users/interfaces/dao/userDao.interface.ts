import { IDao } from '../../../common/interfaces/base/dao.interface';
import { ICreateUserDto } from '../dto/createUserDto.interface';
import { IUserModel } from '../model/userModel.interface';
import { IPatchUserDto } from '../dto/patchUserDto.interface';
import { IPutUserDto } from '../dto/putUserDto.interface';

export interface IUserDao extends IDao {
	getList(): Promise<IUserModel[]>;

	getById(id: string): Promise<IUserModel>;

	getByEmail(email: string): Promise<IUserModel>;

	create(dto: ICreateUserDto): Promise<IUserModel>;

	update(dto: IPutUserDto | IPatchUserDto): Promise<IUserModel>;
	
	delete(id: string): Promise<IUserModel>;
}
