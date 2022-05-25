import { IModel } from './model.interface';

export interface IReturnDto {
	mapFromModel(model: IModel): Promise<IReturnDto>;
}
