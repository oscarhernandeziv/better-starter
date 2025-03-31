import { db } from "@/src/db";
import { todo } from "@/src/db/schema/todo";
import type { CreateTodo, Todo, UpdateTodo } from "@/src/entities/models/todo";
import { and, eq } from "drizzle-orm";

// Internal database types
type DbTodo = typeof todo.$inferSelect;
type DbNewTodo = typeof todo.$inferInsert;

export const TodoRepository = {
	/**
	 * Get all todos for a specific user
	 */
	async getAllTodos(userId: string): Promise<Todo[]> {
		return await db
			.select()
			.from(todo)
			.where(eq(todo.userId, userId))
			.orderBy(todo.createdAt);
	},

	/**
	 * Get a specific todo by ID for a user
	 */
	async getTodoById(id: number, userId: string): Promise<Todo | undefined> {
		const todos = await db
			.select()
			.from(todo)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)));
		return todos[0];
	},

	/**
	 * Create a new todo
	 */
	async createTodo(data: CreateTodo): Promise<Todo> {
		const inserted = await db.insert(todo).values(data).returning();
		return inserted[0];
	},

	/**
	 * Update a todo with new data
	 */
	async updateTodo(
		id: number,
		data: UpdateTodo,
		userId: string,
	): Promise<Todo | undefined> {
		const updated = await db
			.update(todo)
			.set(data)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)))
			.returning();
		return updated[0];
	},

	/**
	 * Toggle the completion status of a todo
	 */
	async toggleTodoCompletion(
		id: number,
		userId: string,
	): Promise<Todo | undefined> {
		// First check if the todo exists and belongs to the user
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

	/**
	 * Delete a todo by ID
	 */
	async deleteTodo(id: number, userId: string): Promise<boolean> {
		const deleted = await db
			.delete(todo)
			.where(and(eq(todo.id, id), eq(todo.userId, userId)))
			.returning();
		return deleted.length > 0;
	},
};
