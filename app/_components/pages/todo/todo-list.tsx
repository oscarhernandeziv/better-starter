"use client";

import type { Todo } from "@/src/db/schema/todo";
import { TodoItem } from "./todo-item";

interface TodoListProps {
	todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
	if (todos.length === 0) {
		return (
			<div className="py-6 text-center text-muted-foreground">
				<p>No todos yet. Add your first todo above.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
}
