"use client";

import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import { Card, CardContent } from "@/app/_components/ui/card";
import type {
	WaitlistFormData,
	WaitlistStep,
	WaitlistStep1Data,
	WaitlistStep2Data,
	WaitlistStep3Data,
} from "@/src/entities/models/waitlist";
import { useWaitlist } from "@/src/hooks/use-waitlist";
import { useCallback } from "react";
import { WaitlistStep1 } from "./waitlist-step1";
import { WaitlistStep2 } from "./waitlist-step2";
import { WaitlistStep3 } from "./waitlist-step3";
import { WaitlistSuccess } from "./waitlist-success";

export function WaitlistForm() {
	const {
		currentStep,
		formData,
		isSubmitting,
		errors,
		submitStep1,
		submitStep2,
		submitStep3,
		goToStep,
		resetForm,
	} = useWaitlist();

	// Handler for step 1 submission
	const handleStep1Submit = useCallback(
		async (data: WaitlistStep1Data) => {
			await submitStep1(data);
		},
		[submitStep1],
	);

	// Handler for step 2 submission
	const handleStep2Submit = useCallback(
		async (data: WaitlistStep2Data) => {
			await submitStep2(data);
		},
		[submitStep2],
	);

	// Handler for step 3 submission
	const handleStep3Submit = useCallback(
		async (data: WaitlistStep3Data) => {
			await submitStep3(data);
		},
		[submitStep3],
	);

	// Handler for back button clicks
	const handleGoBack = useCallback(
		(step: WaitlistStep) => {
			goToStep(step);
		},
		[goToStep],
	);

	// Render the appropriate step component
	const renderStep = () => {
		// If we have a form error, display it as an alert
		const errorMessage = errors.form ? (
			<Alert variant="destructive" className="mb-4">
				<AlertDescription>{errors.form}</AlertDescription>
			</Alert>
		) : null;

		switch (currentStep) {
			case 1:
				return (
					<>
						{errorMessage}
						<WaitlistStep1
							defaultValues={formData}
							onSubmit={handleStep1Submit}
							isSubmitting={isSubmitting}
						/>
					</>
				);
			case 2:
				return (
					<>
						{errorMessage}
						<WaitlistStep2
							defaultValues={formData}
							onSubmit={handleStep2Submit}
							onBack={() => handleGoBack(1)}
							isSubmitting={isSubmitting}
						/>
					</>
				);
			case 3:
				return (
					<>
						{errorMessage}
						<WaitlistStep3
							defaultValues={formData}
							onSubmit={handleStep3Submit}
							onBack={() => handleGoBack(2)}
							isSubmitting={isSubmitting}
						/>
					</>
				);
			case "success":
				return (
					<WaitlistSuccess
						data={formData as WaitlistFormData}
						onReset={resetForm}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardContent className="pt-6">{renderStep()}</CardContent>
		</Card>
	);
}
