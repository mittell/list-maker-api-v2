import { IPutDto } from '../../common/interfaces/base/putDto.interface';

export interface IPutUserDto extends IPutDto {
	get id(): string;
}
