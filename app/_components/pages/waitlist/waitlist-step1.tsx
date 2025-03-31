"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
	type WaitlistStep1Data,
	waitlistStep1Schema,
} from "@/src/entities/models/waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { WaitlistStep1Props } from "./types";

export function WaitlistStep1({
	defaultValues,
	onSubmit,
	isSubmitting,
}: WaitlistStep1Props) {
	// Initialize form with zod resolver
	const form = useForm<WaitlistStep1Data>({
		resolver: zodResolver(waitlistStep1Schema),
		defaultValues: {
			email: defaultValues?.email || "",
			name: defaultValues?.name || "",
		},
	});

	// Handle form submission
	async function handleSubmit(data: WaitlistStep1Data) {
		await onSubmit(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<div className="space-y-1">
					<h2 className="font-semibold text-xl">Join Our Waitlist</h2>
					<p className="text-muted-foreground text-sm">
						Enter your information to get early access.
					</p>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input
									placeholder="you@example.com"
									type="email"
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" autoComplete="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? "Processing..." : "Continue"}
				</Button>
			</form>
		</Form>
	);
}
