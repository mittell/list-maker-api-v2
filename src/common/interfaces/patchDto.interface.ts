export interface IPatchDto {
	get id(): string | undefined;
	mapFromRequest(requestId: string, model: any): Promise<IPatchDto>;
}
