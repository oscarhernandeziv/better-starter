"use client";

import {
	processWaitlistStep2,
	processWaitlistStep3,
	submitWaitlistForm,
	validateWaitlistStep1,
} from "@/app/actions/waitlist-actions";
import type {
	WaitlistFormData,
	WaitlistStep,
	WaitlistStep1Data,
	WaitlistStep2Data,
	WaitlistStep3Data,
} from "@/src/entities/models/waitlist";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UseWaitlistReturn {
	currentStep: WaitlistStep;
	formData: Partial<WaitlistFormData>;
	isSubmitting: boolean;
	errors: Record<string, string>;
	submitStep1: (data: WaitlistStep1Data) => Promise<boolean>;
	submitStep2: (data: WaitlistStep2Data) => Promise<boolean>;
	submitStep3: (data: WaitlistStep3Data) => Promise<boolean>;
	goToStep: (step: WaitlistStep) => void;
	resetForm: () => void;
}

/**
 * Custom hook for managing the multi-step waitlist form
 */
export function useWaitlist(): UseWaitlistReturn {
	// Track the current step
	const [currentStep, setCurrentStep] = useState<WaitlistStep>(1);

	// Store form data across steps
	const [formData, setFormData] = useState<Partial<WaitlistFormData>>({});

	// Track submission state
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Track validation errors
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Step 1 submission handler
	const submitStep1 = useCallback(
		async (data: WaitlistStep1Data): Promise<boolean> => {
			setIsSubmitting(true);
			setErrors({});

			try {
				const result = await validateWaitlistStep1(data);

				if (result.success) {
					// Update form data
					setFormData((prev) => ({ ...prev, ...data }));
					// Move to next step
					setCurrentStep(2);
					return true;
				}

				// Set error message
				setErrors({ form: result.error || "Validation failed" });
				toast.error(result.error || "Please fix the errors in the form");
				return false;
			} catch (error) {
				setErrors({ form: "An unexpected error occurred" });
				toast.error("Something went wrong. Please try again.");
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[],
	);

	// Step 2 submission handler
	const submitStep2 = useCallback(
		async (data: WaitlistStep2Data): Promise<boolean> => {
			setIsSubmitting(true);
			setErrors({});

			try {
				const result = await processWaitlistStep2(data);

				if (result.success) {
					// Update form data
					setFormData((prev) => ({ ...prev, ...data }));
					// Move to next step
					setCurrentStep(3);
					return true;
				}

				// Set error message
				setErrors({ form: result.error || "Validation failed" });
				toast.error(result.error || "Please fix the errors in the form");
				return false;
			} catch (error) {
				setErrors({ form: "An unexpected error occurred" });
				toast.error("Something went wrong. Please try again.");
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[],
	);

	// Step 3 submission handler (final step)
	const submitStep3 = useCallback(
		async (data: WaitlistStep3Data): Promise<boolean> => {
			setIsSubmitting(true);
			setErrors({});

			try {
				// First validate step 3
				const validateResult = await processWaitlistStep3(data);

				if (!validateResult.success) {
					setErrors({ form: validateResult.error || "Validation failed" });
					toast.error(
						validateResult.error || "Please fix the errors in the form",
					);
					return false;
				}

				// Update form data with final step data
				const completeFormData: WaitlistFormData = {
					...(formData as WaitlistStep1Data), // Step 1 data is required
					...(formData as WaitlistStep2Data), // Step 2 data is optional
					...data, // Step 3 data
				};

				// Submit the complete form
				const submitResult = await submitWaitlistForm(completeFormData);

				if (submitResult.success) {
					// Set final form data
					setFormData(completeFormData);
					// Show success step
					setCurrentStep("success");
					toast.success("Thank you for joining our waitlist!");
					return true;
				}

				// Set error message
				setErrors({ form: submitResult.error || "Submission failed" });
				toast.error(
					submitResult.error || "Failed to join waitlist. Please try again.",
				);
				return false;
			} catch (error) {
				setErrors({ form: "An unexpected error occurred" });
				toast.error("Something went wrong. Please try again.");
				return false;
			} finally {
				setIsSubmitting(false);
			}
		},
		[formData],
	);

	// Function to manually go to a step (for back button)
	const goToStep = useCallback(
		(step: WaitlistStep) => {
			// Only allow going back or to success
			if (step === "success") {
				setCurrentStep(step);
				return;
			}

			// Handle numeric steps
			if (typeof currentStep === "number" && typeof step === "number") {
				if (step <= currentStep) {
					setCurrentStep(step);
				}
			}
		},
		[currentStep],
	);

	// Reset the form
	const resetForm = useCallback(() => {
		setFormData({});
		setErrors({});
		setCurrentStep(1);
	}, []);

	return {
		currentStep,
		formData,
		isSubmitting,
		errors,
		submitStep1,
		submitStep2,
		submitStep3,
		goToStep,
		resetForm,
	};
}
