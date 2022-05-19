import { IModel } from '../../common/interfaces/model.interface';

export interface IUserService {
	getUserList(): Promise<IModel[]>;

	getUserById(id: string): Promise<IModel>;

	createUser(model: IModel): Promise<IModel>;

	updateUser(model: IModel): Promise<IModel>;

	deleteUser(id: string): Promise<IModel>;
}
