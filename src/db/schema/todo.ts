import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	content: text("content").notNull(),
	completed: integer("completed", { mode: "boolean" }).notNull().default(false),
	createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
