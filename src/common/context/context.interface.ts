export interface IContext {
	init(): Promise<void>;
	start(): Promise<void>;
	stop(): Promise<void>;
}
