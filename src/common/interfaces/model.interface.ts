import { IDto } from './dto.interface';

export interface IModel {
	mapFromCreateDto(dto: IDto): Promise<void>;
	mapFromPutDto(dto: IDto): Promise<void>;
	mapFromPatchDto(dto: IDto): Promise<void>;
	getModel(dbContext: any): Promise<any>;
}
