import { IPatchDto } from '../../common/interfaces/base/patchDto.interface';

export interface IUserPatchDto extends IPatchDto {
	get id(): string | undefined;
}
