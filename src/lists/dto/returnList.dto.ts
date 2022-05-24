import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { IListModel } from '../interfaces/listModel.interface';
import { IReturnListDto } from '../interfaces/returnListDto.interface';
import { IReturnListItemDto } from '../../listItems/interfaces/returnListItemDto.interface';

@injectable()
export class ReturnListDto implements IReturnListDto {
	private _id!: string;
	private _title!: string;
	private _description!: string;
	private _userId!: string;
	private _listItems!: IReturnListItemDto[];

	public get id() {
		return this._id;
	}

	public get title() {
		return this._title;
	}

	public get description() {
		return this._description;
	}

	public get userId() {
		return this._userId;
	}

	public get listItems() {
		return this._listItems;
	}

	public set listItems(items: IReturnListItemDto[]) {
		this._listItems = items;
	}

	async mapFromModel(model: IListModel): Promise<IReturnListDto> {
		let id: string = model.id;
		let title: string = model.title;
		let description: string = model.description;
		let userId: string = model.userId;

		if (
			isEmpty(id) ||
			isEmpty(title) ||
			isEmpty(description) ||
			isEmpty(userId)
		) {
			throw new MappingError('Unable to map Dto from Model.');
		}

		this._id = id;
		this._title = title;
		this._description = description;
		this._userId = userId;

		return this;
	}
}
