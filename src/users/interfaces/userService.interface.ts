import { ICreateDto } from '../../common/interfaces/createDto.interface';
import { IModel } from '../../common/interfaces/model.interface';
import { IPatchDto } from '../../common/interfaces/patchDto.interface';
import { IPutDto } from '../../common/interfaces/putDto.interface';

export interface IUserService {
	getUserList(): Promise<IModel[]>;

	getUserById(id: string): Promise<IModel>;

	createUser(dto: ICreateDto): Promise<IModel>;

	updateUser(dto: IPatchDto | IPutDto): Promise<IModel>;

	deleteUser(id: string): Promise<IModel>;
}
