import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthService } from '../interfaces/authServices.interface';
import { ITokenReturnDto } from '../interfaces/tokenReturnDto.interface';
import env from '../../common/config/env.config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ValidationError } from '../../common/types/error.types';
import { ReturnTokenDto } from '../dto/returnToken.dto';

@injectable()
export class AuthService implements IAuthService {
	async generateJsonWebToken(body: any): Promise<ITokenReturnDto> {
		try {
			const tokenExpirationInSeconds = 36000;
			const refreshId = body.userId + env.JWT_SECRET;
			const salt = crypto.createSecretKey(crypto.randomBytes(16));
			const hash = crypto
				.createHmac('sha512', salt)
				.update(refreshId)
				.digest('base64');
			body.refreshKey = salt.export();

			const token = jwt.sign(body, env.JWT_SECRET, {
				expiresIn: tokenExpirationInSeconds,
			});
			return new ReturnTokenDto(token, hash);
		} catch (error) {
			throw new ValidationError(
				'Unable to generate JSON Web Token',
				error
			);
		}
	}
}
