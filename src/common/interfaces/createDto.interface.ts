export interface ICreateDto {
	get id(): string;
	set id(value: string);
	get email(): string;
	get username(): string;
	get password(): string;
	mapFromRequest(model: any): Promise<ICreateDto>;
}
