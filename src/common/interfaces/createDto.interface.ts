export interface ICreateDto {
	mapFromRequest(model: any): Promise<ICreateDto>;
}
