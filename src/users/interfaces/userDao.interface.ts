import { IDao } from '../../common/interfaces/dao.interface';
import { IUserCreateDto } from './userCreateDto.interface';
import { IUserModel } from './userModel.interface';
import { IUserPatchDto } from './userPatchDto.interface';
import { IUserPutDto } from './userPutDto.interface';

export interface IUserDao extends IDao {
	getList(): Promise<IUserModel[]>;
	getById(id: string): Promise<IUserModel>;
	create(dto: IUserCreateDto): Promise<IUserModel>;
	update(dto: IUserPutDto | IUserPatchDto): Promise<IUserModel>;
	delete(id: string): Promise<IUserModel>;
}
