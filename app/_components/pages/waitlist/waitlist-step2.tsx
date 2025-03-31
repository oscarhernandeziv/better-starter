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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/_components/ui/select";
import type { WaitlistStep2Data } from "@/src/entities/models/waitlist";
import { waitlistStep2Schema } from "@/src/entities/models/waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { WaitlistStep2Props } from "./types";
import { referralOptions } from "./types";

export function WaitlistStep2({
	defaultValues,
	onSubmit,
	onBack,
	isSubmitting,
}: WaitlistStep2Props) {
	// Initialize form with zod resolver
	const form = useForm<WaitlistStep2Data>({
		resolver: zodResolver(waitlistStep2Schema),
		defaultValues: {
			companyName: defaultValues?.companyName || "",
			referralSource: defaultValues?.referralSource,
		},
	});

	// Handle form submission
	async function handleSubmit(data: WaitlistStep2Data) {
		await onSubmit(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<div className="space-y-1">
					<h2 className="font-semibold text-xl">Tell Us More</h2>
					<p className="text-muted-foreground text-sm">
						Help us understand who you are and how you found us.
					</p>
				</div>

				<FormField
					control={form.control}
					name="companyName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name (Optional)</FormLabel>
							<FormControl>
								<Input
									placeholder="Acme Inc."
									autoComplete="organization"
									{...field}
									value={field.value || ""}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="referralSource"
					render={({ field }) => (
						<FormItem>
							<FormLabel>How did you hear about us? (Optional)</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Please select" />
									</SelectTrigger>
									<SelectContent>
										{referralOptions.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2 pt-2">
					<Button
						type="button"
						variant="outline"
						onClick={onBack}
						className="flex-1"
						disabled={isSubmitting}
					>
						Back
					</Button>
					<Button type="submit" className="flex-1" disabled={isSubmitting}>
						{isSubmitting ? "Processing..." : "Continue"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
