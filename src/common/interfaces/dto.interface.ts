import { IModel } from './model.interface';

export interface IDto {
	mapFromModel(model: IModel): Promise<void>;
}
