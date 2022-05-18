import { Container } from 'inversify';
import { DummyController } from '../../dummy/controllers/dummy.controller';
import { DummyService } from '../../dummy/services/dummy.services';
import { IController } from '../../dummy/controllers/controller.interface';
import { IService } from '../../dummy/services/service.interface';
import { TYPES } from '../types/di.types';
import { DbContext } from '../context/db.context';
import { IContext } from '../context/context.interface';

const container = new Container();

// Context Binding
container.bind<IContext>(TYPES.IContext).to(DbContext).inSingletonScope();

// Service Binding
container.bind<IService>(TYPES.IService).to(DummyService);

// Controller Binding
container.bind<IController>(TYPES.IController).to(DummyController);

export { container };
