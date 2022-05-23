import { IModel } from '../../common/interfaces/base/model.interface';

export interface IListModel extends IModel {
	get id(): string;
	get title(): string;
	get description(): string;
	get userId(): string;
}
