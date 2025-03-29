"use server";

import { auth } from "@/src/lib/auth";
import { TodoService } from "@/src/services/todo-service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTodoSchema = z.object({
	content: z
		.string()
		.min(1, "Content is required")
		.max(255, "Content is too long"),
});

export async function getAllTodos() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		redirect("/sign-in");
	}

	return await TodoService.getAllTodos(session.user.id);
}

export async function getTodoById(id: number) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		redirect("/sign-in");
	}

	return await TodoService.getTodoById(id, session.user.id);
}

export async function createTodo(formData: FormData) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return { success: false, error: "Not authorized" };
	}

	const content = formData.get("content") as string;

	try {
		const validatedFields = createTodoSchema.parse({ content });
		return {
			success: true,
			data: await TodoService.createTodo(
				validatedFields.content,
				session.user.id,
			),
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { success: false, error: error.format() };
		}
		return { success: false, error: "Failed to create todo" };
	}
}

export async function toggleTodoCompletion(id: number) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return { success: false, error: "Not authorized" };
	}

	try {
		const updated = await TodoService.toggleTodoCompletion(id, session.user.id);
		if (!updated) {
			return { success: false, error: "Todo not found" };
		}
		return { success: true, data: updated };
	} catch (error) {
		return { success: false, error: "Failed to toggle todo completion" };
	}
}

export async function deleteTodo(id: number) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return { success: false, error: "Not authorized" };
	}

	try {
		const success = await TodoService.deleteTodo(id, session.user.id);
		if (!success) {
			return { success: false, error: "Todo not found" };
		}
		return { success: true };
	} catch (error) {
		return { success: false, error: "Failed to delete todo" };
	}
}
