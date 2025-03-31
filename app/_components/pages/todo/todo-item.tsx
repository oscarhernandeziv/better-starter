"use client";

import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { cn } from "@/app/_components/utils";
import type { Todo } from "@/src/entities/models/todo";
import { Trash } from "lucide-react";

interface TodoItemProps {
	todo: Todo;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	isToggling?: boolean;
	isDeleting?: boolean;
}

export function TodoItem({
	todo,
	onToggle,
	onDelete,
	isToggling,
	isDeleting,
}: TodoItemProps) {
	return (
		<div className="flex items-center gap-4 bg-card px-4 py-4">
			<Checkbox
				id={`todo-${todo.id}`}
				checked={todo.completed}
				onCheckedChange={() => onToggle(todo.id)}
				disabled={isToggling}
				className="ml-1 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
			/>
			<label
				htmlFor={`todo-${todo.id}`}
				className={cn(
					"flex-1 cursor-pointer truncate text-sm",
					todo.completed && "text-muted-foreground line-through",
				)}
			>
				{todo.content}
			</label>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={() => onDelete(todo.id)}
				disabled={isDeleting}
				className="ml-2 h-8 w-8 text-muted-foreground hover:text-destructive"
			>
				<Trash className="h-4 w-4" />
				<span className="sr-only">Delete todo</span>
			</Button>
		</div>
	);
}
