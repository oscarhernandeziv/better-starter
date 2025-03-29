"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";

interface TodoFormProps {
	onSubmit: (formData: FormData) => void;
	isCreating?: boolean;
}

export function TodoForm({ onSubmit, isCreating }: TodoFormProps) {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (formData: FormData) => {
		onSubmit(formData);
		formRef.current?.reset();
	};

	return (
		<form ref={formRef} action={handleSubmit} className="mb-4 flex gap-2">
			<Input
				name="content"
				placeholder="Add a new todo..."
				className="flex-1"
				disabled={isCreating}
				required
				maxLength={255}
			/>
			<Button type="submit" size="sm" disabled={isCreating}>
				<PlusIcon className="mr-1 h-4 w-4" />
				Add
			</Button>
		</form>
	);
}
