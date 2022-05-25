import { ICreateListItemDto } from '../dto/createListItemDto.interface';
import { IListItemModel } from '../model/listItemModel.interface';
import { IPatchListItemDto } from '../dto/patchListItemDto.interface';
import { IPutListItemDto } from '../dto/putListItemDto.interface';

export interface IListItemService {
	getListItems(): Promise<IListItemModel[]>;

	getListItemsByListId(listId: string): Promise<IListItemModel[]>;

	getListItemById(id: string): Promise<IListItemModel>;

	getListItemByIdAndUserId(
		id: string,
		userId: string
	): Promise<IListItemModel>;

	createListItem(dto: ICreateListItemDto): Promise<IListItemModel>;

	updateListItem(
		dto: IPatchListItemDto | IPutListItemDto
	): Promise<IListItemModel>;

	deleteListItem(id: string): Promise<IListItemModel>;
}
