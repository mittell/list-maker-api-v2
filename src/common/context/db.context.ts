import { injectable } from 'inversify';
import mongoose, { Connection } from 'mongoose';
import { IContext } from './context.interface';
import 'reflect-metadata';

@injectable()
export class DbContext implements IContext {
	private _dbConnectionUrl!: string;
	private _connection!: Connection;

	constructor() {
		this.init()
			.then(() => {
				return this.start();
			})
			.catch((error) => {
				console.log('Error initialising and starting DB connection...');
				console.log(error);
			});
	}

	async init(): Promise<void> {
		// Setup MongoDB Connection
		const init: Promise<void> = new Promise((resolve, reject) => {
			const ip = process.env.DB_IP;
			const port = process.env.DB_PORT;
			const name = process.env.DB_NAME;

			if (this.isEmpty(ip) || this.isEmpty(port) || this.isEmpty(name)) {
				reject('Missing Env Variables');
			}
			this._dbConnectionUrl = `mongodb://${ip}:${port}/${name}`;

			resolve();
		});

		return init;
	}

	async start(): Promise<void> {
		// Start MongoDB Connection
		const start: Promise<void> = new Promise(async (resolve, reject) => {
			const mongooseOptions = {
				serverSelectionTimeoutMS: 5000,
			};

			this._connection = mongoose.connection;

			console.log('Attempting MongoDB connection...');
			await mongoose
				.connect(this._dbConnectionUrl, mongooseOptions)
				.then(() => {
					console.log('MongoDB successfully connected!');
					resolve();
				})
				.catch((error) => {
					console.log(
						`MongoDB connection was unsuccessful...`,
						error
					);
					reject();
				});
		});

		return await start;
	}

	async stop(): Promise<void> {
		// Stop MongoDB Connection
		const stop: Promise<void> = new Promise(async (resolve, reject) => {
			await this._connection
				.close()
				.then(() => {
					console.log('MongoDB successfully closed!');
					resolve();
				})
				.catch(() => {
					console.log('MongoDB closing was unsuccessful...');
					reject();
				});
		});

		return stop;
	}

	isEmpty(value: string | undefined): boolean {
		if (value === '' || value === undefined || value === null) {
			return true;
		}

		return false;
	}

	async find(collection: string, filter: Object): Promise<any> {
		const find: Promise<any> = new Promise(async (resolve, reject) => {
			console.log('I got this far!');
			console.log(collection);
			var result = await this._connection
				.collection(collection)
				.findOne(filter);
			if (result) {
				resolve(result);
			} else {
				reject();
			}
		});

		return find;
	}
}
