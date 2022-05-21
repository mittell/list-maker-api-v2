import { isEmpty } from '../helpers/utils.helpers';

interface ENV {
	PORT: number | undefined;
	DB_URL: string | undefined;
	NODE_ENV: string | undefined;
	SENTRY_URL: string | undefined;
}

interface Config {
	PORT: number;
	DB_URL: string;
	NODE_ENV: string;
	SENTRY_URL: string;
}

const getConfig = (): ENV => {
	return {
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		DB_URL: process.env.DB_URL ? process.env.DB_URL : undefined,
		NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : undefined,
		SENTRY_URL: process.env.SENTRY_URL ? process.env.SENTRY_URL : undefined,
	};
};

const getSanitisedConfig = (configValues: ENV): Config => {
	for (const [key, value] of Object.entries(configValues)) {
		if (isEmpty(value)) {
			throw new Error(`Missing key: '${key}' in config.env...`);
		}
	}
	return configValues as Config;
};

const config = getConfig();
const env = getSanitisedConfig(config);

export default env;
