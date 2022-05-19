import { IModel } from './model.interface';

export interface IDao {
	getList(): Promise<IModel[]>;
	getById(id: string): Promise<IModel>;
	create(model: IModel): Promise<IModel>;
	update(model: IModel): Promise<IModel>;
	delete(id: string): Promise<IModel>;
}
