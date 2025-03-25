import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		TURSO_DB_URL: z.string().url(),
		TURSO_DB_AUTH_TOKEN: z.string().min(1),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		RESEND_API_KEY: z.string(),
		BETTER_AUTH_URL: z.string().url(),
	},
	client: {
		NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
	},
	runtimeEnv: {
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		TURSO_DB_URL: process.env.TURSO_DB_URL,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		TURSO_DB_AUTH_TOKEN: process.env.TURSO_DB_AUTH_TOKEN,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
	},
	// biome-ignore lint/nursery/noProcessEnv: only place process.env is allowed
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
