import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
	out: "./drizzle",
	schema: "./drizzle/schema/*.ts",
	dialect: "turso",
	dbCredentials: {
		url: env.TURSO_DB_URL,
		authToken: env.TURSO_DB_AUTH_TOKEN,
	},
});
