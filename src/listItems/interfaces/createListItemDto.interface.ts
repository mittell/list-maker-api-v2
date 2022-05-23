import { ICreateDto } from '../../common/interfaces/base/createDto.interface';

export interface ICreateListItemDto extends ICreateDto {
	get id(): string;
	set id(value: string);
	get title(): string;
	get description(): string;
	get isComplete(): boolean;
	get listId(): string;
	set listId(value: string);
	get userId(): string;
	set userId(value: string);
}
