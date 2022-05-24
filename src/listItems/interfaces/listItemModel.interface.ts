import { IModel } from '../../common/interfaces/base/model.interface';

export interface IListItemModel extends IModel {
	get id(): string;

	get title(): string;

	get description(): string;

	get isComplete(): boolean;

	get listId(): string;
	
	get userId(): string;
}
