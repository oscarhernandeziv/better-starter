"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import type { Todo } from "@/src/db/schema/todo";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";

interface TodoContentProps {
	todos: Todo[];
}

export function TodoContent({ todos }: TodoContentProps) {
	return (
		<div className="flex h-full flex-col overflow-y-auto border-border border-t p-6 md:border-t-0 md:border-l">
			<Card>
				<CardHeader>
					<CardTitle>Todo List</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<TodoForm />
					<TodoList todos={todos} />
				</CardContent>
			</Card>
		</div>
	);
}
