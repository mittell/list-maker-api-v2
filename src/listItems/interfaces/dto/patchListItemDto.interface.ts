import { IPatchDto } from '../../../common/interfaces/base/patchDto.interface';

export interface IPatchListItemDto extends IPatchDto {
	get id(): string | undefined;
}
