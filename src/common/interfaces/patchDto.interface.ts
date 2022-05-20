import { IModel } from './model.interface';

export interface IPatchDto {
	get id(): string | undefined;
	mapFromRequest(model: any): Promise<void>;
	mapFromModel(model: IModel): Promise<void>;
}
