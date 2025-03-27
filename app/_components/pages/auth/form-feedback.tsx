"use client";

import { cn } from "@/app/_components/utils";

interface FormErrorProps {
	message?: string | null;
	className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
	if (!message) return null;

	return (
		<div
			className={cn(
				"rounded-md bg-destructive/15 p-3 text-destructive text-sm",
				className,
			)}
		>
			{message}
		</div>
	);
}

interface FormSuccessProps {
	message?: string | null;
	className?: string;
}

export function FormSuccess({ message, className }: FormSuccessProps) {
	if (!message) return null;

	return (
		<div
			className={cn(
				"rounded-md bg-emerald-500/15 p-3 text-emerald-500 text-sm",
				className,
			)}
		>
			{message}
		</div>
	);
}
