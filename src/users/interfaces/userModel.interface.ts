import { IModel } from '../../common/interfaces/model.interface';

export interface IUserModel extends IModel {
	get email(): string;
	get username(): string;
	get password(): string;
}
