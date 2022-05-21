export interface IPatchDto {
	mapFromRequest(requestId: string, model: any): Promise<IPatchDto>;
}
