import { ITokenReturnDto } from './tokenReturnDto.interface';

export interface IAuthService {
    generateJsonWebToken(body: any): Promise<ITokenReturnDto>
}