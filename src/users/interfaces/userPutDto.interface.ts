import { IPutDto } from '../../common/interfaces/base/putDto.interface';

export interface IUserPutDto extends IPutDto {
	get id(): string;
}
