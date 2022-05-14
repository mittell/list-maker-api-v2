export interface IService {
	getDummy(id: number): Promise<string>;
}
