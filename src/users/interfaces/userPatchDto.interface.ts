import { IPatchDto } from '../../common/interfaces/patchDto.interface';

export interface IUserPatchDto extends IPatchDto {
	get id(): string | undefined;
}
