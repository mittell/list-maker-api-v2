import env from '../config/env.config';
import { injectable } from 'inversify';
import 'reflect-metadata';
import mongoose, { Connection } from 'mongoose';
import { IContext } from './context.interface';
import { isEmpty } from '../helpers/utils.helpers';
import { ConfigurationError } from '../types/error.types';

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

	public get connection() {
		return this._connection;
	}

	async init(): Promise<void> {
		const url = env.DB_URL;

		if (isEmpty(url)) {
			throw new ConfigurationError('Missing Env Variables');
		}

		this._dbConnectionUrl = url;
	}

	async start(): Promise<void> {
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
			})
			.catch((error) => {
				console.log(`MongoDB connection was unsuccessful...`, error);
				console.log('================================');
			});
	}

	async stop(): Promise<void> {
		await this._connection
			.close()
			.then(() => {
				console.log('MongoDB successfully closed!');
			})
			.catch(() => {
				console.log('MongoDB closing was unsuccessful...');
			});
	}
}
