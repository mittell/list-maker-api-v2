import { IContext } from '../context/context.interface';
import { ICreateDto } from './createDto.interface';
import { IPatchDto } from './patchDto.interface';
import { IPutDto } from './putDto.interface';

export interface IModel {
	mapFromCreateDto(dto: ICreateDto): Promise<void>;
	mapFromUpdateDto(dto: IPutDto | IPatchDto): Promise<void>;
	getModel(dbContext: IContext): Promise<any>;
}
