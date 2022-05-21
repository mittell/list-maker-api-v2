export interface IPutDto {
	get id(): string;
	mapFromRequest(requestId: string, model: any): Promise<IPutDto>;
}
