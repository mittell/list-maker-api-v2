export interface IDao {
	getList(): Promise<any[]>;
	getById(id: number): Promise<any>;
	create(model: any): Promise<any>;
	update(model: any): Promise<any>;
	delete(id: number): Promise<any>;
}
