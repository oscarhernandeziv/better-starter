"use client";

import { Button } from "@/app/_components/ui/button";
import { createTodo } from "@/src/actions/todo-actions";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function TodoForm() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmit(formData: FormData) {
		setIsLoading(true);
		setError(null);

		const result = await createTodo(formData);

		if (result.error) {
			setError(result.error);
		} else {
			formRef.current?.reset();
			router.refresh();
		}

		setIsLoading(false);
	}

	return (
		<form ref={formRef} action={handleSubmit} className="flex flex-col gap-2">
			<div className="flex w-full gap-2">
				<input
					type="text"
					name="content"
					placeholder="What needs to be done?"
					className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isLoading}
				/>
				<Button type="submit" disabled={isLoading}>
					Add Todo
				</Button>
			</div>
			{error && <p className="text-destructive text-sm">{error}</p>}
		</form>
	);
}
