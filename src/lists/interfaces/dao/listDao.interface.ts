import { IDao } from '../../../common/interfaces/base/dao.interface';
import { ICreateListDto } from '../dto/createListDto.interface';
import { IListModel } from '../model/listModel.interface';
import { IPatchListDto } from '../dto/patchListDto.interface';
import { IPutListDto } from '../dto/putListDto.interface';

export interface IListDao extends IDao {
	getList(): Promise<IListModel[]>;

	getListWithPageLimit(
		limit: number | undefined,
		page: number | undefined
	): Promise<IListModel[]>;

	getListByUserId(
		userId: string,
		limit: number | undefined,
		page: number | undefined
	): Promise<IListModel[]>;

	getById(id: string): Promise<IListModel>;

	getByIdAndUserId(id: string, userId: string): Promise<IListModel>;

	create(dto: ICreateListDto): Promise<IListModel>;

	update(dto: IPutListDto | IPatchListDto): Promise<IListModel>;
	
	delete(id: string): Promise<IListModel>;
}
