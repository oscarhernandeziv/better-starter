"use server";

import { ValidationError } from "@/src/entities/errors/common";
import type {
	WaitlistFormData,
	WaitlistStep1Data,
	WaitlistStep2Data,
	WaitlistStep3Data,
} from "@/src/entities/models/waitlist";
import {
	submitWaitlistEntry,
	submitWaitlistStep1,
	validateWaitlistStep2,
	validateWaitlistStep3,
} from "@/src/services/waitlist-service";

/**
 * Server action to handle the complete waitlist form submission
 * @param formData Complete form data or FormData object
 */
export async function submitWaitlistForm(
	formData: FormData | WaitlistFormData,
) {
	try {
		// Convert FormData to object if necessary
		const data: WaitlistFormData =
			formData instanceof FormData
				? (Object.fromEntries(
						formData.entries(),
					) as unknown as WaitlistFormData)
				: formData;

		// Use the service to submit the entry
		await submitWaitlistEntry(data);

		return { success: true };
	} catch (error) {
		if (error instanceof ValidationError) {
			return { success: false, error: error.message };
		}

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}

/**
 * Server action to validate and process step 1 of the waitlist form
 * @param formData Step 1 form data
 */
export async function validateWaitlistStep1(
	formData: FormData | WaitlistStep1Data,
) {
	try {
		// Convert FormData to object if necessary
		const data: WaitlistStep1Data =
			formData instanceof FormData
				? {
						email: formData.get("email") as string,
						name: formData.get("name") as string,
					}
				: formData;

		// Use the service to validate step 1
		await submitWaitlistStep1(data);

		return { success: true, data };
	} catch (error) {
		if (error instanceof ValidationError) {
			return { success: false, error: error.message };
		}

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}

/**
 * Server action to validate step 2 of the waitlist form
 * @param formData Step 2 form data
 */
export async function processWaitlistStep2(
	formData: FormData | WaitlistStep2Data,
) {
	try {
		// Convert FormData to object if necessary
		const data: WaitlistStep2Data =
			formData instanceof FormData
				? {
						companyName: (formData.get("companyName") as string) || undefined,
						referralSource:
							(formData.get("referralSource") as
								| "social_media"
								| "friend"
								| "search_engine"
								| "blog"
								| "other") || undefined,
					}
				: formData;

		// Use the service to validate
		validateWaitlistStep2(data);

		return { success: true, data };
	} catch (error) {
		if (error instanceof ValidationError) {
			return { success: false, error: error.message };
		}

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}

/**
 * Server action to validate step 3 of the waitlist form
 * @param formData Step 3 form data
 */
export async function processWaitlistStep3(
	formData: FormData | WaitlistStep3Data,
) {
	try {
		// Convert FormData to object if necessary
		const data: WaitlistStep3Data =
			formData instanceof FormData
				? {
						interestCategory:
							(formData.get("interestCategory") as
								| "product_updates"
								| "beta_testing"
								| "early_access"
								| "partnership"
								| "investment") || undefined,
						additionalInfo:
							(formData.get("additionalInfo") as string) || undefined,
					}
				: formData;

		// Use the service to validate
		validateWaitlistStep3(data);

		return { success: true, data };
	} catch (error) {
		if (error instanceof ValidationError) {
			return { success: false, error: error.message };
		}

		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}
