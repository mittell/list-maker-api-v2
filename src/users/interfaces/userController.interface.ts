import { Request, Response, NextFunction } from 'express';

export interface IUserController {
	getUserList(req: Request, res: Response, next: NextFunction): Promise<void>;
}
