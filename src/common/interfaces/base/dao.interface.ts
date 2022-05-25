import { ICreateDto } from './createDto.interface';
import { IModel } from './model.interface';
import { IPatchDto } from './patchDto.interface';
import { IPutDto } from './putDto.interface';

export interface IDao {
	getList(): Promise<IModel[]>;

	getById(id: string): Promise<IModel>;

	create(dto: ICreateDto): Promise<IModel>;

	update(dto: IPutDto | IPatchDto): Promise<IModel>;
	
	delete(id: string): Promise<IModel>;
}
