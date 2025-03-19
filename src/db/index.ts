import { env } from "@/src/config/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Create a Turso database client
const client = createClient({
	url: env.TURSO_DB_URL,
	authToken: env.TURSO_DB_AUTH_TOKEN,
});

// Create a Drizzle ORM instance with the Turso client
export const db = drizzle(client);
