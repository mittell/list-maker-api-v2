import { IModel } from './model.interface';

export interface IPutDto {
    get id(): string;
	mapFromRequest(model: any): Promise<void>;
    mapFromModel(model: IModel): Promise<void>;
}
