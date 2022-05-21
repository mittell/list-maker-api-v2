import { IModel } from './model.interface';

export interface IPutDto {
	get id(): string;
	mapFromRequest(requestId: string, model: any): Promise<IPutDto>;
	mapFromModel(model: IModel): Promise<void>;
}
