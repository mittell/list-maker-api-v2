import { IReturnTokenDto } from './returnTokenDto.interface';

export interface IAuthService {
	generateJsonWebToken(body: any): Promise<IReturnTokenDto>;
}
