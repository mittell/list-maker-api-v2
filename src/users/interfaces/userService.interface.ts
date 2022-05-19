import { IModel } from '../../common/interfaces/model.interface';

export interface IUserService {
	getUserList(): Promise<IModel[]>;

	getUserById(id: number): Promise<IModel>;

	createUser(model: IModel): Promise<IModel>;

	updateUser(model: IModel): Promise<IModel>;

	deleteUser(id: number): Promise<IModel>;
}
