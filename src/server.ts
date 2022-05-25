import 'dotenv/config';
import 'reflect-metadata';
import env from './common/config/env.config';
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils';
import { container } from './common/config/inversify.config';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import * as prettyjson from 'prettyjson';
import {
	handleErrors,
	handleInvalidUrl,
} from './common/middleware/error.middleware';

// Import Controllers
import './auth/controllers/auth.controller';
import './users/controllers/user.controller';
import './lists/controllers/list.controller';
import './listItems/controllers/listItem.controller';

const port = env.PORT;

console.log('================================');

let server = new InversifyExpressServer(container);

const corsOptions = {
	allowedHeaders: [
		'Origin',
		'X-Requested-With',
		'Content-Type',
		'Accept',
		'X-Access-Token',
	],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: '*',
	preflightContinue: false,
};

server.setConfig((app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cors(corsOptions));
	app.use(helmet());

	Sentry.init({
		dsn: env.SENTRY_URL,
		tracesSampleRate: 1.0,
	});

	console.log('Server configuration complete...');
});

server.setErrorConfig((app) => {
	app.use(handleInvalidUrl);
	app.use(handleErrors);
});

export default server.build().listen(port, () => {
	if (env.NODE_ENV === 'development') {
		const routeInfo = getRouteInfo(container);
		console.log('================================');
		console.log(prettyjson.render({ routes: routeInfo }));
		console.log('================================');
	}

	console.log(`Server listening on port ${port}...`);
	console.log(`Environment - ${env.NODE_ENV}`);
	console.log('================================');
});
