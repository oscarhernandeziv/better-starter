import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema/*.ts",
	dialect: "turso",
	dbCredentials: {
		url: env.TURSO_DB_URL,
		authToken: env.TURSO_DB_AUTH_TOKEN,
	},
});
