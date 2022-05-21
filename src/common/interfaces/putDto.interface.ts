export interface IPutDto {
	mapFromRequest(requestId: string, model: any): Promise<IPutDto>;
}
