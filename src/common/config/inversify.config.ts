import { Container } from 'inversify';
import { TYPES } from '../types/di.types';

import { IContext } from '../../dummy/context/context.interface';
import { DbContext } from '../../dummy/context/db.context';
import { IController } from '../../dummy/controllers/controller.interface';
import { DummyController } from '../../dummy/controllers/dummy.controller';
import { IService } from '../../dummy/services/service.interface';
import { DummyService } from '../../dummy/services/dummy.services';

const container = new Container();

// Context Binding
container.bind<IContext>(TYPES.IContext).to(DbContext).inSingletonScope();

// Service Binding
container.bind<IService>(TYPES.IService).to(DummyService);

// Controller Binding
container.bind<IController>(TYPES.IController).to(DummyController);

export { container };
