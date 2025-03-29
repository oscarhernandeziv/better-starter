"use client";

import { useTodos } from "@/src/hooks/use-todos";
import { Loader2 } from "lucide-react";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";

export function TodoContent() {
	const {
		todos,
		isLoading,
		isError,
		createTodo,
		isCreating,
		toggleTodo,
		isToggling,
		deleteTodo,
		isDeleting,
	} = useTodos();

	if (isLoading) {
		return (
			<div className="flex h-40 w-full items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex h-40 w-full flex-col items-center justify-center text-center">
				<p className="font-medium text-destructive">Something went wrong</p>
				<p className="mt-1 text-muted-foreground text-sm">
					Error loading todos. Please try again.
				</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="mb-6">
				<h2 className="font-bold text-2xl tracking-tight">Todo List</h2>
				<p className="text-muted-foreground">Track your tasks and progress</p>
			</div>
			<div className="flex flex-col space-y-4">
				<TodoForm onSubmit={createTodo} isCreating={isCreating} />
				<TodoList
					todos={todos}
					onToggle={toggleTodo}
					onDelete={deleteTodo}
					isToggling={isToggling}
					isDeleting={isDeleting}
				/>
			</div>
		</div>
	);
}
