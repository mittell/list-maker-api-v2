import { IPutDto } from '../../../common/interfaces/base/putDto.interface';

export interface IPutListDto extends IPutDto {
	get id(): string;
}
