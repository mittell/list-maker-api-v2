import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { ICreateListItemDto } from '../interfaces/createListItemDto.interface';

@injectable()
export class CreateListItemDto implements ICreateListItemDto {
	private _id!: string;
	private _title!: string;
	private _description!: string;
	private _isComplete!: boolean;
	private _listId!: string;
	private _userId!: string;

	public get id() {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
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

	public set listId(value: string) {
		this._listId = value;
	}

	public get userId() {
		return this._userId;
	}

	public set userId(value: string) {
		this._userId = value;
	}

	async mapFromRequest(model: any): Promise<ICreateListItemDto> {
		let title: string = model.title;
		let description: string = model.description;
		let isComplete: boolean = model.isComplete;
		let listId: string = model.listId;

		if (
			isEmpty(title) ||
			isEmpty(description) ||
			isEmpty(isComplete) ||
			isEmpty(listId)
		) {
			throw new MappingError('Unable to map Dto from Request.');
		}

		this._title = title;
		this._description = description;
		this._isComplete = isComplete;
		this._listId = listId;

		return this;
	}
}
