import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { IListItemModel } from '../interfaces/listItemModel.interface';
import { IReturnListItemDto } from '../interfaces/returnListItemDto.interface';

@injectable()
export class ReturnListItemDto implements IReturnListItemDto {
	private _id!: string;
	private _title!: string;
	private _description!: string;
	private _isComplete!: boolean;
	private _listId!: string;
	private _userId!: string;

	public get id() {
		return this._id;
	}

	public get title() {
		return this._title;
	}

	public get description() {
		return this._description;
	}

	public get isComplete() {
		return this._isComplete;
	}

	public get listId() {
		return this._listId;
	}

	public get userId() {
		return this._userId;
	}

	async mapFromModel(model: IListItemModel): Promise<IReturnListItemDto> {
		let id: string = model.id;
		let title: string = model.title;
		let description: string = model.description;
		let isComplete: boolean = model.isComplete;
		let listId: string = model.listId;
		let userId: string = model.userId;

		if (
			isEmpty(id) ||
			isEmpty(title) ||
			isEmpty(description) ||
			isEmpty(isComplete) ||
			isEmpty(listId) ||
			isEmpty(userId)
		) {
			throw new MappingError('Unable to map Dto from Model.');
		}

		this._id = id;
		this._title = title;
		this._description = description;
		this._isComplete = isComplete;
		this._listId = listId;
		this._userId = userId;

		return this;
	}
}
