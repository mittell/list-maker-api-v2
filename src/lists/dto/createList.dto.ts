import 'reflect-metadata';
import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { MappingError } from '../../common/types/error.types';
import { ICreateListDto } from '../interfaces/createListDto.interface';

@injectable()
export class CreateListDto implements ICreateListDto {
	private _id!: string;
	private _title!: string;
	private _description!: string;
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

	public get userId() {
		return this._userId;
	}

	public set userId(value: string) {
		this._userId = value;
	}

	async mapFromRequest(model: any): Promise<ICreateListDto> {
		let title: string = model.title;
		let description: string = model.description;

		if (isEmpty(title) || isEmpty(description)) {
			throw new MappingError('Unable to map Dto from Request.');
		}

		this._title = title;
		this._description = description;

		return this;
	}
}
