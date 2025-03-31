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
	type WaitlistStep2Data,
	type WaitlistStep2Props,
	referralOptions,
	waitlistStep2Schema,
} from "@/src/entities/models/waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
								<select
									className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
									{...field}
									value={field.value || ""}
								>
									<option value="">Please select</option>
									{referralOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
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
