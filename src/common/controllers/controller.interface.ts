import { Request, Response, NextFunction } from 'express';

export interface IController {
	getDummy(req: Request, res: Response, next: NextFunction): Promise<void>;
}
