import { ICreateListDto } from './createListDto.interface';
import { IListModel } from './listModel.interface';
import { IPatchListDto } from './patchListDto.interface';
import { IPutListDto } from './putListDto.interface';

export interface IListService {
	getLists(
		limit: number | undefined,
		page: number | undefined
	): Promise<IListModel[]>;

	getListsByUserId(
		userId: string,
		limit: number | undefined,
		page: number | undefined
	): Promise<IListModel[]>;

	getListById(id: string): Promise<IListModel>;

	getListByIdAndUserId(id: string, userId: string): Promise<IListModel>;

	createList(dto: ICreateListDto): Promise<IListModel>;

	updateList(dto: IPatchListDto | IPutListDto): Promise<IListModel>;

	deleteList(id: string): Promise<IListModel>;
}
