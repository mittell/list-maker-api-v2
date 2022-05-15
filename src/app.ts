import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { inject } from 'inversify';
import { IContext } from './common/context/context.interface';
import { TYPES } from './common/types/di.types';

export class App {
	private _DbContext: IContext;
	public app: Application;

	constructor(@inject(TYPES.IContext) dbContext: IContext) {
		this._DbContext = dbContext;
		this.app = express();
		// this.server = new Server();
		// this.port = env.PORT;

		this._DbContext
			.init()
			.then(() => {
				return this._DbContext.start();
			})
			.catch((error) => {
				console.log('App start error');
				console.log(error);
			});
	}

	// public async initialiseLoggers() {
	// 	Sentry.init({
	// 		dsn: env.SENTRY_URL,
	// 		tracesSampleRate: 1.0,
	// 	});

	// 	this.server.on('error', (error) => {
	// 		Sentry.captureException(error);
	// 	});
	// 	console.log('Loggers initialised...');
	// }

	public async registerParsers() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.use(helmet());
		console.log('Parsers registered...');
	}

	// public async registerRoutes() {
	// 	registerCommonRoutes(this.app);
	// 	registerListRoutes(this.app);
	// 	registerListItemRoutes(this.app);
	// 	registerUserRoutes(this.app);
	// 	console.log('Routes registered...');
	// }

	// public async registerMiddleware() {
	// 	this.app.use(handleInvalidUrl);
	// 	this.app.use(handleErrors);
	// 	console.log('Middleware registered...');
	// }

	// public async start() {
	// 	return new Promise<void>((resolve) => {
	// 		this.server = this.app.listen(this.port, resolve);
	// 		console.log(`Server listening on port ${this.port}...`);
	// 		console.log(`Environment - ${env.NODE_ENV}`);
	// 	});
	// }

	// public async stop() {
	// 	return new Promise<void>((resolve, reject) => {
	// 		this.server.close((error) => {
	// 			if (error) {
	// 				return reject(error);
	// 			}
	// 			resolve();
	// 		});
	// 	});
	// }

	// public async startMongooseConnection() {
	// 	const mongooseOptions = {
	// 		serverSelectionTimeoutMS: 5000,
	// 	};

	// 	this.mongooseConnection = mongoose.connection;

	// 	console.log('Attempting MongoDB connection...');
	// 	await mongoose
	// 		.connect(env.MONGO_URL, mongooseOptions)
	// 		.then(() => {
	// 			console.log('MongoDB successfully connected!');
	// 		})
	// 		.catch((error) => {
	// 			console.log(`MongoDB connection was unsuccessful... `, error);
	// 			Sentry.captureException(error);
	// 		});
	// }

	// public async stopMongooseConnection() {
	// 	await this.mongooseConnection.close();
	// }
}
