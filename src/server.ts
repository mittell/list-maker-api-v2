import 'dotenv/config';
import 'reflect-metadata';
import env from './common/config/env.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './common/config/inversify.config';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// Import Controllers
import './users/controllers/user.controller';

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
	console.log('Server configuration complete...');
});

export default server.build().listen(port, () => {
	console.log(`Server listening on port ${port}...`);
	console.log(`Environment - ${env.NODE_ENV}`);
	console.log('================================');
});
