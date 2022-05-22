import { ICreateDto } from '../../common/interfaces/base/createDto.interface';

export interface IUserCreateDto extends ICreateDto {
	get id(): string;
	set id(value: string);
	get email(): string;
	get username(): string;
	get password(): string;
	set password(value: string);
}
