import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { IPutListDto } from '../interfaces/putListDto.interface';

@injectable()
export class PutListDto implements IPutListDto {
	private _id!: string;
	private _title!: string;
	private _description!: string;
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

	public get userId() {
		return this._userId;
	}

	async mapFromRequest(requestId: string, model: any): Promise<IPutListDto> {
		let id: string = requestId;
		let title: string = model.title;
		let description: string = model.description;

		if (isEmpty(id) || isEmpty(title) || isEmpty(description)) {
			throw new MappingError('Unable to map Dto from Request.');
		}

		this._id = id;
		this._title = title;
		this._description = description;

		return this;
	}
}
