import 'dotenv/config';
import express, { Request, Response } from 'express';
// import * as http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import './common/controllers/dummy.controller';
import { container } from './common/config/inversify.config';

const app = express();
// const server = http.createServer(app);
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World!');
});

// server.listen(port, () => {
// 	console.log(`Server listening on port ${port}...`);
// });

let server = new InversifyExpressServer(container, null, null, app);
// server.setConfig((a) => {
// 	// add body parser
// 	//   app.use(bodyParser.urlencoded({
// 	//     extended: true
// 	//   }));
// 	//   app.use(bodyParser.json());
// 	console.log(a);
// });

// let app = server.build();

export default server.build().listen(port, () => {
	console.log(`Server listening on port ${port}...`);
	console.log(`Environment - ${process.env.NODE_ENV}`);
});
