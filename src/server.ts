import 'dotenv/config';
import express, { Request, Response } from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World!');
});

server.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});
