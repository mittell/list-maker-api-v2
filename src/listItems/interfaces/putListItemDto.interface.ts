import { IPutDto } from '../../common/interfaces/base/putDto.interface';

export interface IPutListItemDto extends IPutDto {
	get id(): string;
}
