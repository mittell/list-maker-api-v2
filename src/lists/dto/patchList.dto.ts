import { injectable } from 'inversify';
import { isEmpty } from '../../common/helpers/utils.helpers';
import { IPatchListDto } from '../interfaces/patchListDto.interface';

@injectable()
export class PatchListDto implements IPatchListDto {
	private _id: string | undefined;
	private _title: string | undefined;
	private _description: string | undefined;
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

	public get userId() {
		return this._userId;
	}

	async mapFromRequest(
		requestId: string,
		model: any
	): Promise<IPatchListDto> {
		let id: string = requestId;
		let title: string | undefined = model.title;
		let description: string | undefined = model.description;

		if (!isEmpty(id)) {
			this._id = id;
		}

		if (!isEmpty(title)) {
			this._title = title;
		}

		if (!isEmpty(description)) {
			this._description = description;
		}

		return this;
	}
}
