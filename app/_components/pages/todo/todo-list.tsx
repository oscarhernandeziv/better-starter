"use client";

import type { Todo } from "@/src/entities/models/todo";
import { ClipboardList } from "lucide-react";
import { TodoItem } from "./todo-item";

interface TodoListProps {
	todos: Todo[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	isToggling?: boolean;
	isDeleting?: boolean;
}

export function TodoList({
	todos,
	onToggle,
	onDelete,
	isToggling,
	isDeleting,
}: TodoListProps) {
	if (todos.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-md border border-border bg-card p-8 text-center">
				<ClipboardList className="mb-2 h-10 w-10 text-muted-foreground" />
				<h3 className="font-medium text-lg">No todos yet</h3>
				<p className="mt-1 text-muted-foreground text-sm">
					Add a new todo to get started
				</p>
			</div>
		);
	}

	return (
		<div className="divide-y divide-border rounded-md border border-border">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					isToggling={isToggling}
					isDeleting={isDeleting}
				/>
			))}
		</div>
	);
}
