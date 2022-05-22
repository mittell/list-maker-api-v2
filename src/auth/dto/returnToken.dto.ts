import { ITokenReturnDto } from '../interfaces/tokenReturnDto.interface';

export class ReturnTokenDto implements ITokenReturnDto {
	public accessToken: string;
	public refreshToken: string;

	constructor(access: string, refresh: string) {
		this.accessToken = access;
		this.refreshToken = refresh;
	}
}
