import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const todo = sqliteTable("todo", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	content: text("content").notNull(),
	completed: integer("completed", { mode: "boolean" }).notNull().default(false),
	createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});
