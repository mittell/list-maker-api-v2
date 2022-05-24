import env from '../config/env.config';
import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
// import { Result as ExpressValidatorError } from 'express-validator';
import {
	BadRequestError,
	InternalServerError,
	UnauthenticatedError,
	UnauthorizedError,
	ValidationError,
	MappingError,
	NotFoundError,
} from '../types/error.types';
import * as Sentry from '@sentry/node';

export async function handleInvalidUrl(
	req: Request,
	res: Response
): Promise<void> {
	res.status(404).json({
		status: 404,
		message: 'Invalid route.',
		...(req.method ? { request: req.method } : {}),
		...(req.path ? { path: req.path } : {}),
	});
}

export async function handleErrors(
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction
): Promise<void> {
	if (env.NODE_ENV === 'development') {
		Sentry.captureException(error);
	}

	if (
		error instanceof UnauthorizedError ||
		error instanceof UnauthenticatedError ||
		error instanceof BadRequestError ||
		error instanceof MappingError
	) {
		res.status(error.status).json({
			status: error.status,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
		});
	} else if (error instanceof InternalServerError) {
		res.status(error.status).json({
			status: error.status,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
		});
	} else if (error instanceof ValidationError) {
		res.status(error.status).json({
			status: error.status,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
			...(error.errors.length ? { details: error.errors } : {}),
		});
		// } else if (error instanceof ExpressValidatorError) {
		// 	res.status(406).json({
		// 		status: 406,
		// 		name: 'ExpressValidatorError',
		// 		message: [
		// 			...new Set(
		// 				error
		// 					.array()
		// 					.map((e: any) =>
		// 						e.param === '' ? `${e.msg}` : `${e.param}: ${e.msg}`
		// 					)
		// 			),
		// 		],
		// 	});
	} else if (error instanceof MongooseError.ValidationError) {
		res.status(406).json({
			status: 406,
			name: error.name,
			...(error.message
				? { message: Object.values(error.errors).map((e) => e.message) }
				: {}),
		});
	} else if (error instanceof MongoError) {
		res.status(500).json({
			status: 500,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
		});
	} else if (error instanceof SyntaxError) {
		res.status(406).json({
			status: 406,
			name: error.name,
			...(error.message ? { message: 'Invalid JSON content' } : {}),
		});
	} else if (error instanceof TypeError) {
		res.status(500).json({
			status: 500,
			name: error.name,
			...(error.message ? { message: 'Unexpected Data Type' } : {}),
		});
	} else if (error instanceof NotFoundError) {
		res.status(404).json({
			status: 404,
			name: error.name,
			message: 'Not Found',
		});
	} else {
		res.status(error.status || 500).json({
			status: error.status || 500,
			name: error.name,
			message: 'Unhandled internal server error',
		});
	}
}
