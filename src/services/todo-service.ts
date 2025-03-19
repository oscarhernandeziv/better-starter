import { TodoRepository } from "@/src/db/repositories/todo-repository";
import type { NewTodo, Todo } from "@/src/db/schema/todo";

export class TodoService {
	private repository: TodoRepository;

	constructor() {
		this.repository = new TodoRepository();
	}

	async getAllTodos(): Promise<Todo[]> {
		return await this.repository.findAll();
	}

	async getTodoById(id: number): Promise<Todo | undefined> {
		return await this.repository.findById(id);
	}

	async createTodo(content: string): Promise<Todo> {
		const newTodo: NewTodo = {
			content,
			completed: false,
		};
		return await this.repository.create(newTodo);
	}

	async updateTodo(
		id: number,
		data: Partial<NewTodo>,
	): Promise<Todo | undefined> {
		return await this.repository.update(id, data);
	}

	async deleteTodo(id: number): Promise<void> {
		await this.repository.delete(id);
	}

	async toggleTodoComplete(id: number): Promise<Todo | undefined> {
		return await this.repository.toggleComplete(id);
	}
}
