import { NotFoundError } from "@/src/entities/errors/common";
import type { CreateTodo, Todo, UpdateTodo } from "@/src/entities/models/todo";
import { TodoRepository } from "@/src/repositories/todo-repository";

export const TodoService = {
	async getAllTodos(userId: string): Promise<Todo[]> {
		return await TodoRepository.getAllTodos(userId);
	},

	async getTodoById(id: number, userId: string): Promise<Todo> {
		const todo = await TodoRepository.getTodoById(id, userId);
		if (!todo) {
			throw new NotFoundError("Todo");
		}
		return todo;
	},

	async createTodo(data: CreateTodo): Promise<Todo> {
		return await TodoRepository.createTodo(data);
	},

	async updateTodo(
		id: number,
		data: UpdateTodo,
		userId: string,
	): Promise<Todo> {
		const updated = await TodoRepository.updateTodo(id, data, userId);
		if (!updated) {
			throw new NotFoundError("Todo");
		}
		return updated;
	},

	async toggleTodoCompletion(id: number, userId: string): Promise<Todo> {
		const updated = await TodoRepository.toggleTodoCompletion(id, userId);
		if (!updated) {
			throw new NotFoundError("Todo");
		}
		return updated;
	},

	async deleteTodo(id: number, userId: string): Promise<boolean> {
		const success = await TodoRepository.deleteTodo(id, userId);
		if (!success) {
			throw new NotFoundError("Todo");
		}
		return success;
	},
};
