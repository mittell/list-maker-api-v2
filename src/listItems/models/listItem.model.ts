import 'reflect-metadata';
import { injectable } from 'inversify';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { IListItemModel } from '../interfaces/model/listItemModel.interface';
import { CreateListItemDto } from '../dto/createListItem.dto';
import { PutListItemDto } from '../dto/putListItem.dto';
import { PatchListItemDto } from '../dto/patchListItem.dto';

@injectable()
export class ListItemModel implements IListItemModel {
	@prop({ required: true })
	private _id!: string;

	@prop({ required: true })
	private _title!: string;

	@prop({ required: true })
	private _description!: string;

	@prop({ required: true, default: false })
	private _isComplete!: boolean;

	@prop({ required: true })
	private _listId!: string;

	@prop({ required: true })
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

	public set title(value: string) {
		this._title = value;
	}

	public get description() {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get isComplete() {
		return this._isComplete;
	}

	public set isComplete(value: boolean) {
		this._isComplete = value;
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

	public getModel(dbContext: any): any {
		return getModelForClass(ListItemModel, {
			existingMongoose: dbContext.connection,
			schemaOptions: {
				collection: 'listItems',
				_id: true,
				timestamps: true,
				toObject: { virtuals: true },
			},
		});
	}

	public async mapFromCreateDto(dto: CreateListItemDto): Promise<any> {
		if (
			isEmpty(dto.id) ||
			isEmpty(dto.title) ||
			isEmpty(dto.description) ||
			isEmpty(dto.isComplete) ||
			isEmpty(dto.listId) ||
			isEmpty(dto.userId)
		) {
			throw new MappingError('Unable to map from CreateDto.');
		}

		this._id = dto.id;
		this._title = dto.title;
		this._description = dto.description;
		this._isComplete = dto.isComplete;
		this._listId = dto.listId;
		this._userId = dto.userId;

		return this;
	}

	public async mapFromUpdateDto(
		dto: PutListItemDto | PatchListItemDto
	): Promise<any> {
		if (!isEmpty(dto.id)) {
			this._id = dto.id as string;
		}

		if (!isEmpty(dto.title)) {
			this._title = dto.title as string;
		}

		if (!isEmpty(dto.description)) {
			this._description = dto.description as string;
		}

		if (!isEmpty(dto.isComplete)) {
			this._isComplete = dto.isComplete as boolean;
		}

		if (!isEmpty(dto.listId)) {
			this._listId = dto.listId as string;
		}

		if (!isEmpty(dto.userId)) {
			this._userId = dto.userId as string;
		}

		return this;
	}
}
