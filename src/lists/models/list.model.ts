import 'reflect-metadata';
import { injectable } from 'inversify';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { IListModel } from '../interfaces/listModel.interface';
import { CreateListDto } from '../dto/createList.dto';
import { PutListDto } from '../dto/putList.dto';
import { PatchListDto } from '../dto/patchList.dto';

@injectable()
export class ListModel implements IListModel {
	@prop({ required: true })
	private _id!: string;

	@prop({ required: true })
	private _title!: string;

	@prop({ required: true })
	private _description!: string;

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

	public get userId() {
		return this._userId;
	}

	public set userId(value: string) {
		this._userId = value;
	}

	public getModel(dbContext: any): any {
		return getModelForClass(ListModel, {
			existingMongoose: dbContext.connection,
			schemaOptions: {
				collection: 'lists',
				_id: true,
				timestamps: true,
				toObject: { virtuals: true },
			},
		});
	}

	public async mapFromCreateDto(dto: CreateListDto): Promise<any> {
		if (
			isEmpty(dto.id) ||
			isEmpty(dto.title) ||
			isEmpty(dto.description) ||
			isEmpty(dto.userId)
		) {
			throw new MappingError('Unable to map from CreateDto.');
		}

		this._id = dto.id;
		this._title = dto.title;
		this._description = dto.description;
		this._userId = dto.userId;

		return this;
	}

	public async mapFromUpdateDto(
		dto: PutListDto | PatchListDto
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

		if (!isEmpty(dto.userId)) {
			this._userId = dto.userId as string;
		}

		return this;
	}
}
