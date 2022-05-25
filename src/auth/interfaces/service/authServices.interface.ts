import { IReturnTokenDto } from '../dto/returnTokenDto.interface';

export interface IAuthService {
	generateJsonWebToken(body: any): Promise<IReturnTokenDto>;
}
