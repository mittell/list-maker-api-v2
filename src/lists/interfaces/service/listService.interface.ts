import { ICreateListDto } from '../dto/createListDto.interface';
import { IPatchListDto } from '../dto/patchListDto.interface';
import { IPutListDto } from '../dto/putListDto.interface';
import { IListModel } from '../model/listModel.interface';

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
