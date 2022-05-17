import { Container } from 'inversify';
import { DummyController } from '../controllers/dummy.controller';
import { DummyService } from '../services/dummy.services';
import { IController } from '../controllers/controller.interface';
import { IService } from '../services/service.interface';
import { TYPES } from '../types/di.types';
import { DbContext } from '../context/db.context';
import { IContext } from '../context/context.interface';

const container = new Container();
container.bind<IService>(TYPES.IService).to(DummyService);
container.bind<IController>(TYPES.IController).to(DummyController);
container.bind<IContext>(TYPES.IContext).to(DbContext).inSingletonScope();

export { container };
