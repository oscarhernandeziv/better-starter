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
import { useResult } from "@/src/hooks/use-result";
import { useCallback, useState } from "react";

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
	const { createMutation } = useResult();
	const [currentStep, setCurrentStep] = useState<WaitlistStep>(1);
	const [formData, setFormData] = useState<Partial<WaitlistFormData>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Step 1 submission mutation
	const step1Mutation = createMutation(
		(data: WaitlistStep1Data) => validateWaitlistStep1(data),
		{
			loadingMessage: "Validating step 1...",
			getSuccessMessage: () => "Step 1 validated successfully",
			getErrorMessage: (error) => error.message || "Step 1 validation failed",
			minimumLoadingTime: 400,
			defaultErrorMessage: "Failed to validate step 1",
		},
	);

	// Step 2 submission mutation
	const step2Mutation = createMutation(
		(data: WaitlistStep2Data) => processWaitlistStep2(data),
		{
			loadingMessage: "Validating step 2...",
			getSuccessMessage: () => "Step 2 validated successfully",
			getErrorMessage: (error) => error.message || "Step 2 validation failed",
			minimumLoadingTime: 400,
			defaultErrorMessage: "Failed to validate step 2",
		},
	);

	// Step 3 submission mutation
	const step3Mutation = createMutation(
		(data: WaitlistStep3Data) => processWaitlistStep3(data),
		{
			loadingMessage: "Validating step 3...",
			getSuccessMessage: () => "Step 3 validated successfully",
			getErrorMessage: (error) => error.message || "Step 3 validation failed",
			minimumLoadingTime: 400,
			defaultErrorMessage: "Failed to validate step 3",
		},
	);

	// Final form submission mutation
	const submitFormMutation = createMutation(
		(data: WaitlistFormData) => submitWaitlistForm(data),
		{
			loadingMessage: "Submitting form...",
			getSuccessMessage: () => "Thank you for joining our waitlist!",
			getErrorMessage: (error) => error.message || "Failed to submit form",
			minimumLoadingTime: 600,
			defaultErrorMessage: "Failed to submit form",
		},
	);

	// Step 1 submission handler
	const submitStep1 = useCallback(
		async (data: WaitlistStep1Data): Promise<boolean> => {
			const result = await step1Mutation.mutateAsync(data);
			if (result.success) {
				setFormData((prev) => ({ ...prev, ...data }));
				setCurrentStep(2);
				return true;
			}
			return false;
		},
		[step1Mutation],
	);

	// Step 2 submission handler
	const submitStep2 = useCallback(
		async (data: WaitlistStep2Data): Promise<boolean> => {
			const result = await step2Mutation.mutateAsync(data);
			if (result.success) {
				setFormData((prev) => ({ ...prev, ...data }));
				setCurrentStep(3);
				return true;
			}
			return false;
		},
		[step2Mutation],
	);

	// Step 3 submission handler
	const submitStep3 = useCallback(
		async (data: WaitlistStep3Data): Promise<boolean> => {
			const validateResult = await step3Mutation.mutateAsync(data);
			if (!validateResult.success) {
				return false;
			}

			const completeFormData: WaitlistFormData = {
				...(formData as WaitlistStep1Data),
				...(formData as WaitlistStep2Data),
				...data,
			};

			const submitResult =
				await submitFormMutation.mutateAsync(completeFormData);
			if (submitResult.success) {
				setFormData(completeFormData);
				setCurrentStep("success");
				return true;
			}
			return false;
		},
		[formData, step3Mutation, submitFormMutation],
	);

	// Function to manually go to a step (for back button)
	const goToStep = useCallback(
		(step: WaitlistStep) => {
			if (step === "success") {
				setCurrentStep(step);
			} else if (
				typeof step === "number" &&
				typeof currentStep === "number" &&
				step <= currentStep
			) {
				setCurrentStep(step);
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

	const isSubmitting =
		step1Mutation.isPending ||
		step2Mutation.isPending ||
		step3Mutation.isPending ||
		submitFormMutation.isPending;

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
