import env from '../../common/config/env.config';
import { injectable } from 'inversify';
import mongoose, { Connection } from 'mongoose';
import { IContext } from './context.interface';
import 'reflect-metadata';
import { isEmpty } from '../../common/helpers/utils.helpers';

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
		const init: Promise<void> = new Promise((resolve, reject) => {
			const url = env.DB_URL;

			if (isEmpty(url)) {
				reject('Missing Env Variables');
			}

			this._dbConnectionUrl = url;

			resolve();
		});

		return init;
	}

	async start(): Promise<void> {
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
					console.log('================================');

					resolve();
				})
				.catch((error) => {
					console.log(
						`MongoDB connection was unsuccessful...`,
						error
					);
					console.log('================================');

					reject();
				});
		});

		return start;
	}

	async stop(): Promise<void> {
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

	async find(collection: string, filter: Object): Promise<any> {
		const find: Promise<any> = new Promise(async (resolve, reject) => {
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
