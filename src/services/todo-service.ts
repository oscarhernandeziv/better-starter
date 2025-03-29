import {
	type NewTodo,
	TodoRepository,
} from "@/src/db/repositories/todo-repository";

export const TodoService = {
	async getAllTodos(userId: string) {
		return await TodoRepository.getAllTodos(userId);
	},

	async getTodoById(id: number, userId: string) {
		return await TodoRepository.getTodoById(id, userId);
	},

	async createTodo(content: string, userId: string) {
		const newTodo: NewTodo = {
			content,
			completed: false,
			userId,
		};
		return await TodoRepository.createTodo(newTodo);
	},

	async updateTodo(
		id: number,
		data: Partial<Omit<NewTodo, "userId">>,
		userId: string,
	) {
		return await TodoRepository.updateTodo(id, data, userId);
	},

	async toggleTodoCompletion(id: number, userId: string) {
		return await TodoRepository.toggleTodoCompletion(id, userId);
	},

	async deleteTodo(id: number, userId: string) {
		return await TodoRepository.deleteTodo(id, userId);
	},
};
