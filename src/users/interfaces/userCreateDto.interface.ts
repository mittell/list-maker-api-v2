import { ICreateDto } from '../../common/interfaces/createDto.interface';

export interface IUserCreateDto extends ICreateDto {
	get email(): string;
	get username(): string;
	get password(): string;
}
