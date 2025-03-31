"use server";

import { auth } from "@/src/config/auth";
import { UnauthorizedError } from "@/src/entities/errors/common";
import { type Todo, createTodoSchema } from "@/src/entities/models/todo";
import {
	type Result,
	handleAsync,
	handleAuthenticatedAsync,
} from "@/src/lib/result";
import { TodoService } from "@/src/services/todo-service";
import { headers } from "next/headers";

// Get the authenticated user or throw an error
async function getAuthenticatedUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new UnauthorizedError();
	}

	return session.user;
}

export async function getAllTodos() {
	return handleAuthenticatedAsync(
		async () => {
			const user = await getAuthenticatedUser();
			return await TodoService.getAllTodos(user.id);
		},
		"/sign-in",
		"Get all todos",
	);
}

export async function getTodoById(id: number) {
	return handleAuthenticatedAsync(
		async () => {
			const user = await getAuthenticatedUser();
			return await TodoService.getTodoById(id, user.id);
		},
		"/sign-in",
		"Get todo by ID",
	);
}

export async function createTodo(formData: FormData): Promise<Result<Todo>> {
	return handleAsync(
		async () => {
			const user = await getAuthenticatedUser();
			const content = formData.get("content") as string;

			const validatedFields = createTodoSchema.parse({
				content,
				userId: user.id,
				completed: false,
			});

			return await TodoService.createTodo(validatedFields);
		},
		{ errorContext: "Create todo" },
	);
}

export async function toggleTodoCompletion(id: number): Promise<Result<Todo>> {
	return handleAsync(
		async () => {
			const user = await getAuthenticatedUser();
			return await TodoService.toggleTodoCompletion(id, user.id);
		},
		{ errorContext: "Toggle todo completion" },
	);
}

export async function deleteTodo(id: number): Promise<Result<boolean>> {
	return handleAsync(
		async () => {
			const user = await getAuthenticatedUser();
			return await TodoService.deleteTodo(id, user.id);
		},
		{ errorContext: "Delete todo" },
	);
}
