import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './common/config/inversify.config';

import './common/controllers/dummy.controller';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const port = process.env.PORT;

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cors());
	app.use(helmet());
	console.log('Configuration complete!');
});

export default server.build().listen(port, () => {
	console.log(`Server listening on port ${port}...`);
	console.log(`Environment - ${process.env.NODE_ENV}`);
});
