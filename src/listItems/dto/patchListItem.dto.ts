import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { IPatchListItemDto } from '../interfaces/dto/patchListItemDto.interface';

@injectable()
export class PatchListItemDto implements IPatchListItemDto {
	private _id: string | undefined;
	private _title: string | undefined;
	private _description: string | undefined;
	private _isComplete: boolean | undefined;
	private _listId: string | undefined;
	private _userId: string | undefined;

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

	async mapFromRequest(
		requestId: string,
		model: any
	): Promise<IPatchListItemDto> {
		let id: string = requestId;
		let title: string | undefined = model.title;
		let description: string | undefined = model.description;
		let isComplete: boolean | undefined = model.isComplete;
		let listId: string | undefined = model.listId;

		if (!isEmpty(id)) {
			this._id = id;
		}

		if (!isEmpty(title)) {
			this._title = title;
		}

		if (!isEmpty(description)) {
			this._description = description;
		}

		if (!isEmpty(isComplete)) {
			this._isComplete = isComplete;
		}

		if (!isEmpty(listId)) {
			this._listId = listId;
		}

		return this;
	}
}
