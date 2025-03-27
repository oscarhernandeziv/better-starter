import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		TURSO_DB_URL: z.string().url(),
		TURSO_DB_AUTH_TOKEN: z.string().min(1),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		GOOGLE_CLIENT_ID: z.string().optional(),
		GOOGLE_CLIENT_SECRET: z.string().optional(),
		RESEND_API_KEY: z.string(),
		BETTER_AUTH_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string(),
		NODE_ENV: z.enum(["development", "production"]).default("development"),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
	},
	runtimeEnv: {
		TURSO_DB_URL: process.env.TURSO_DB_URL,
		TURSO_DB_AUTH_TOKEN: process.env.TURSO_DB_AUTH_TOKEN,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		NODE_ENV: process.env.NODE_ENV,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});