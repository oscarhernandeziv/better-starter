import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		TURSO_DB_URL: z.string().url(),
		TURSO_DB_AUTH_TOKEN: z.string().min(1),
	},
	client: {},
	runtimeEnv: {
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		TURSO_DB_URL: process.env.TURSO_DB_URL,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		TURSO_DB_AUTH_TOKEN: process.env.TURSO_DB_AUTH_TOKEN,
	},
	// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
