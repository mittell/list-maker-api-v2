import { IPatchDto } from '../../common/interfaces/base/patchDto.interface';

export interface IPatchUserDto extends IPatchDto {
	get id(): string | undefined;
}
