import { Request, Response } from 'express';
import { IController } from './controller.interface';
import { inject } from 'inversify';
import 'reflect-metadata';
import {
	controller,
	httpGet,
	request,
	response,
	// requestParam,
} from 'inversify-express-utils';
import { TYPES } from '../../common/types/di.types';
import { IService } from '../services/service.interface';

@controller('/dummy')
export class DummyController implements IController {
	private _dummyService: IService;

	public constructor(@inject(TYPES.IService) dummyService: IService) {
		this._dummyService = dummyService;
	}

	@httpGet('/')
	async getDummy(
		// @requestParam('id') id: string,
		@request() _req: Request,
		@response() res: Response
	): Promise<void> {
		// let data = await this._dummyService.getDummy(1);
		let data = await this._dummyService.getUser();
		res.status(200).json({ data });
	}
}
