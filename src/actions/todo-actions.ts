"use server";

import { TodoService } from "@/src/services/todo-service";
import { z } from "zod";

const todoService = new TodoService();

export async function getTodos() {
	try {
		return { todos: await todoService.getAllTodos(), error: null };
	} catch (error) {
		console.error("Failed to get todos:", error);
		return { todos: [], error: "Failed to load todos" };
	}
}

const CreateTodoSchema = z.object({
	content: z.string().min(1, "Todo content is required"),
});

export async function createTodo(formData: FormData) {
	const content = formData.get("content");

	try {
		const result = CreateTodoSchema.safeParse({ content });

		if (!result.success) {
			return {
				todo: null,
				error:
					result.error.flatten().fieldErrors.content?.[0] || "Invalid input",
			};
		}

		const todo = await todoService.createTodo(result.data.content);
		return { todo, error: null };
	} catch (error) {
		console.error("Failed to create todo:", error);
		return { todo: null, error: "Failed to create todo" };
	}
}

export async function toggleTodo(id: number) {
	try {
		const todo = await todoService.toggleTodoComplete(id);
		if (!todo) {
			return { success: false, error: "Todo not found" };
		}
		return { success: true, error: null };
	} catch (error) {
		console.error(`Failed to toggle todo ${id}:`, error);
		return { success: false, error: "Failed to update todo" };
	}
}

export async function deleteTodo(id: number) {
	try {
		await todoService.deleteTodo(id);
		return { success: true, error: null };
	} catch (error) {
		console.error(`Failed to delete todo ${id}:`, error);
		return { success: false, error: "Failed to delete todo" };
	}
}
