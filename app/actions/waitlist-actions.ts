"use server";
import type {
	WaitlistFormData,
	WaitlistStep1Data,
	WaitlistStep2Data,
	WaitlistStep3Data,
} from "@/src/entities/models/waitlist";
import { type Result, handleAsync } from "@/src/lib/result";
import { WaitlistService } from "@/src/services/waitlist-service";

/**
 * Server action to handle the complete waitlist form submission
 * @param formData Complete form data or FormData object
 */
export async function submitWaitlistForm(
	formData: FormData | WaitlistFormData,
): Promise<Result<boolean>> {
	return handleAsync(
		async () => {
			// Convert FormData to object if necessary
			const data: WaitlistFormData =
				formData instanceof FormData
					? (Object.fromEntries(
							formData.entries(),
						) as unknown as WaitlistFormData)
					: formData;

			return WaitlistService.submitWaitlistEntry(data);
		},
		{ errorContext: "Submit waitlist form" },
	);
}

/**
 * Server action to validate and process step 1 of the waitlist form
 * @param formData Step 1 form data
 */
export async function validateWaitlistStep1(
	formData: FormData | WaitlistStep1Data,
): Promise<Result<WaitlistStep1Data>> {
	return handleAsync(
		async () => {
			// Convert FormData to object if necessary
			const data: WaitlistStep1Data =
				formData instanceof FormData
					? {
							email: formData.get("email") as string,
							name: formData.get("name") as string,
						}
					: formData;

			return WaitlistService.validateStep1(data);
		},
		{ errorContext: "Validate waitlist step 1" },
	);
}

/**
 * Server action to validate step 2 of the waitlist form
 * @param formData Step 2 form data
 */
export async function processWaitlistStep2(
	formData: FormData | WaitlistStep2Data,
): Promise<Result<WaitlistStep2Data>> {
	return handleAsync(
		async () => {
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

			return WaitlistService.validateStep2(data);
		},
		{ errorContext: "Process waitlist step 2" },
	);
}

/**
 * Server action to validate step 3 of the waitlist form
 * @param formData Step 3 form data
 */
export async function processWaitlistStep3(
	formData: FormData | WaitlistStep3Data,
): Promise<Result<WaitlistStep3Data>> {
	return handleAsync(
		async () => {
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

			return WaitlistService.validateStep3(data);
		},
		{ errorContext: "Process waitlist step 3" },
	);
}
