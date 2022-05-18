export interface IService {
	getDummy(id: number): Promise<string>;
	getUser(): Promise<IModel>;
}
