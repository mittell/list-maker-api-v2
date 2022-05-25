import 'reflect-metadata';
import { Container } from 'inversify';
import {
	cleanUpMetadata,
	InversifyExpressServer,
} from 'inversify-express-utils';

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import supertest from 'supertest';
import { handleInvalidUrl } from '../src/common/middleware/error.middleware';

let container: Container = null;
let request: supertest.SuperAgentTest;

// let UserServiceMock: UserService;

beforeEach(() => {
	// UserServiceMock = mock(UserServiceImpl);
	container = new Container();

	// container.bind<UserController>('controller').to(UserController);
	// container
	// 	.bind<UserService>('userService')
	// 	.toConstantValue(instance(UserServiceMock));

	const mockServer = new InversifyExpressServer(
		container,
		null,
		null,
		null,
		null,
		false
	);

	mockServer.setConfig((app) => {
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cors());
		app.use(helmet());
	});

	mockServer.setErrorConfig((app) => {
		app.use(handleInvalidUrl);
	});

	request = supertest.agent(mockServer.build());
});

afterEach(() => {});

describe('Main Server', () => {
	beforeEach(() => {
		cleanUpMetadata();
	});

	test('Call to default URL returns 404', async () => {
		const res = await request.get('/').send();

		expect(res.status).toBe(404);
	});
});
