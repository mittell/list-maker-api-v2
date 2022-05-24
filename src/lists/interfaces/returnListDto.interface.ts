import { IReturnDto } from '../../common/interfaces/base/returnDto.interface';
import { IReturnListItemDto } from '../../listItems/interfaces/returnListItemDto.interface';

export interface IReturnListDto extends IReturnDto {
	get id(): string;
	get listItems(): IReturnListItemDto[];
	set listItems(items: IReturnListItemDto[]);
}
