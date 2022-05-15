import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './common/config/inversify.config';
import { App } from './app';

import './common/controllers/dummy.controller';
import { DbContext } from './common/context/db.context';

const port = process.env.PORT;
const app = new App(new DbContext()).app;

let server = new InversifyExpressServer(container, null, null, app).build();

export default server.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
	console.log(`Environment - ${process.env.NODE_ENV}`);
});
