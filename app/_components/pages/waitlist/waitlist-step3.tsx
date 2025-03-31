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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import type { WaitlistStep3Data } from "@/src/entities/models/waitlist";
import { waitlistStep3Schema } from "@/src/entities/models/waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { WaitlistStep3Props } from "./types";
import { interestOptions } from "./types";

export function WaitlistStep3({
	defaultValues,
	onSubmit,
	onBack,
	isSubmitting,
}: WaitlistStep3Props) {
	// Initialize form with zod resolver
	const form = useForm<WaitlistStep3Data>({
		resolver: zodResolver(waitlistStep3Schema),
		defaultValues: {
			interestCategory: defaultValues?.interestCategory,
			additionalInfo: defaultValues?.additionalInfo || "",
		},
	});

	// Handle form submission
	async function handleSubmit(data: WaitlistStep3Data) {
		await onSubmit(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<div className="space-y-1">
					<h2 className="font-semibold text-xl">Almost Done!</h2>
					<p className="text-muted-foreground text-sm">
						Tell us how you're interested in using our product.
					</p>
				</div>

				<FormField
					control={form.control}
					name="interestCategory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>What interests you most? (Optional)</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Please select" />
									</SelectTrigger>
									<SelectContent>
										{interestOptions.map((option) => (
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

				<FormField
					control={form.control}
					name="additionalInfo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional Information (Optional)</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us more about your use case or any specific requirements"
									className="min-h-20"
									{...field}
									value={field.value || ""}
								/>
							</FormControl>
							<FormMessage />
							<p className="text-muted-foreground text-xs">
								{field.value?.length || 0}/500 characters
							</p>
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
						{isSubmitting ? "Processing..." : "Submit"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
