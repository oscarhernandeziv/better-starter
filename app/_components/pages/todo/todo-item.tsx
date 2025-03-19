"use client";

import { Button } from "@/app/_components/ui/button";
import { deleteTodo, toggleTodo } from "@/src/actions/todo-actions";
import type { Todo } from "@/src/db/schema/todo";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoItemProps {
	todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleToggle = async () => {
		setIsLoading(true);
		await toggleTodo(todo.id);
		router.refresh();
		setIsLoading(false);
	};

	const handleDelete = async () => {
		setIsLoading(true);
		await deleteTodo(todo.id);
		router.refresh();
		setIsLoading(false);
	};

	return (
		<div className="flex items-center justify-between gap-2 rounded-md border border-border p-2">
			<div className="flex items-center gap-2">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={handleToggle}
					disabled={isLoading}
					className="h-4 w-4 cursor-pointer rounded-sm border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring"
				/>
				<span
					className={todo.completed ? "text-muted-foreground line-through" : ""}
				>
					{todo.content}
				</span>
			</div>
			<Button
				variant="ghost"
				size="sm"
				onClick={handleDelete}
				disabled={isLoading}
				className="h-7 w-7 p-0"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-4 w-4"
					aria-label="Delete"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</Button>
		</div>
	);
}
