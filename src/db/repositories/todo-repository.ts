import { db } from "@/src/db";
import { todo } from "@/src/db/schema/todo";
import { and, eq } from "drizzle-orm";

export type Todo = typeof todo.$inferSelect;
export type NewTodo = typeof todo.$inferInsert;

export const TodoRepository = {
	async getAllTodos(userId: string): Promise<Todo[]> {
		return await db
			.select()
			.from(todo)
			.where(eq(todo.userId, userId))
			.orderBy(todo.createdAt);
	},

	async getTodoById(id: number, userId: string): Promise<Todo | undefined> {
		const todos = await db
			.select()
			.from(todo)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)));
		return todos[0];
	},

	async createTodo(data: NewTodo): Promise<Todo> {
		const inserted = await db.insert(todo).values(data).returning();
		return inserted[0];
	},

	async updateTodo(
		id: number,
		data: Partial<Omit<NewTodo, "userId">>,
		userId: string,
	): Promise<Todo | undefined> {
		const updated = await db
			.update(todo)
			.set(data)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)))
			.returning();
		return updated[0];
	},

	async toggleTodoCompletion(
		id: number,
		userId: string,
	): Promise<Todo | undefined> {
		const todos = await db
			.select()
			.from(todo)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)));
		if (!todos.length) return undefined;

		const currentTodo = todos[0];
		const updated = await db
			.update(todo)
			.set({ completed: !currentTodo.completed })
			.where(and(eq(todo.id, id), eq(todo.userId, userId)))
			.returning();

		return updated[0];
	},

	async deleteTodo(id: number, userId: string): Promise<boolean> {
		const deleted = await db
			.delete(todo)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)))
			.returning();
		return deleted.length > 0;
	},
};
