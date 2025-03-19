import { db } from "@/src/db";
import type { NewTodo, Todo } from "@/src/db/schema/todo";
import { todos } from "@/src/db/schema/todo";
import { eq } from "drizzle-orm";

export class TodoRepository {
	async findAll(): Promise<Todo[]> {
		return await db.select().from(todos).orderBy(todos.createdAt);
	}

	async findById(id: number): Promise<Todo | undefined> {
		const result = await db.select().from(todos).where(eq(todos.id, id));
		return result[0];
	}

	async create(todo: NewTodo): Promise<Todo> {
		const result = await db.insert(todos).values(todo).returning();
		return result[0];
	}

	async update(id: number, todo: Partial<NewTodo>): Promise<Todo | undefined> {
		const result = await db
			.update(todos)
			.set(todo)
			.where(eq(todos.id, id))
			.returning();
		return result[0];
	}

	async delete(id: number): Promise<void> {
		await db.delete(todos).where(eq(todos.id, id));
	}

	async toggleComplete(id: number): Promise<Todo | undefined> {
		const todo = await this.findById(id);
		if (!todo) return undefined;

		return await this.update(id, { completed: !todo.completed });
	}
}
