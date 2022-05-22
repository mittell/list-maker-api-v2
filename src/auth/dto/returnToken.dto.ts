import { IReturnTokenDto } from '../interfaces/returnTokenDto.interface';

export class ReturnTokenDto implements IReturnTokenDto {
	public accessToken: string;
	public refreshToken: string;

	constructor(access: string, refresh: string) {
		this.accessToken = access;
		this.refreshToken = refresh;
	}
}
