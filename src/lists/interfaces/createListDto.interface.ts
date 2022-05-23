import { ICreateDto } from '../../common/interfaces/base/createDto.interface';

export interface ICreateListDto extends ICreateDto {
	get id(): string;
	set id(value: string);
	get title(): string;
	get description(): string;
	get userId(): string;
	set userId(value: string);
}
