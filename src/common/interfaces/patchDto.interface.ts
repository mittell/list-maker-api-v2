import { IModel } from './model.interface';

export interface IPatchDto {
	get id(): string | undefined;
	mapFromRequest(requestId: string, model: any): Promise<IPatchDto>;
	mapFromModel(model: IModel): Promise<void>;
}
