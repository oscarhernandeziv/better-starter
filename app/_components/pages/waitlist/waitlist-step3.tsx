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
	type WaitlistStep3Data,
	type WaitlistStep3Props,
	interestOptions,
	waitlistStep3Schema,
} from "@/src/entities/models/waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
								<select
									className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									{...field}
									value={field.value || ""}
								>
									<option value="">Please select</option>
									{interestOptions.map((option) => (
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

				<FormField
					control={form.control}
					name="additionalInfo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional Information (Optional)</FormLabel>
							<FormControl>
								<textarea
									className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									placeholder="Tell us more about your use case or any specific requirements"
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
