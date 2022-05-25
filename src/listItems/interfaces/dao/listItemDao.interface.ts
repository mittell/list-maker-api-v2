import { IDao } from '../../../common/interfaces/base/dao.interface';
import { ICreateListItemDto } from '../dto/createListItemDto.interface';
import { IListItemModel } from '../model/listItemModel.interface';
import { IPatchListItemDto } from '../dto/patchListItemDto.interface';
import { IPutListItemDto } from '../dto/putListItemDto.interface';

export interface IListItemDao extends IDao {
	getList(): Promise<IListItemModel[]>;

	getListByUserId(userId: string): Promise<IListItemModel[]>;

	getListByListId(listId: string): Promise<IListItemModel[]>;

	getListByUserIdAndListId(
		userId: string,
		listId: string
	): Promise<IListItemModel[]>;

	getById(id: string): Promise<IListItemModel>;

	getByIdAndUserId(id: string, userId: string): Promise<IListItemModel>;

	create(dto: ICreateListItemDto): Promise<IListItemModel>;

	update(dto: IPutListItemDto | IPatchListItemDto): Promise<IListItemModel>;
	
	delete(id: string): Promise<IListItemModel>;
}
