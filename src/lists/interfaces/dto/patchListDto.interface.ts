import { IPatchDto } from '../../../common/interfaces/base/patchDto.interface';

export interface IPatchListDto extends IPatchDto {
	get id(): string | undefined;
}
