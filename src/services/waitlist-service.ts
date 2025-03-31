import { ValidationError } from "@/src/entities/errors/common";
import {
	type WaitlistEntry,
	type WaitlistFormData,
	type WaitlistStep1Data,
	type WaitlistStep2Data,
	type WaitlistStep3Data,
	waitlistFormSchema,
} from "@/src/entities/models/waitlist";
import {
	createWaitlistEntry,
	getWaitlistEntryByEmail,
} from "@/src/repositories/waitlist-repository";

/**
 * Submit a complete waitlist entry
 * @param data Complete waitlist form data
 * @returns The created waitlist entry
 */
export async function submitWaitlistEntry(
	data: WaitlistFormData,
): Promise<WaitlistEntry> {
	// Validate the data with zod schema
	const result = waitlistFormSchema.safeParse(data);

	if (!result.success) {
		throw new ValidationError(result.error.message);
	}

	// Check if email already exists
	const existingEntry = await getWaitlistEntryByEmail(data.email);
	if (existingEntry) {
		throw new ValidationError(
			"This email is already registered in our waitlist",
		);
	}

	// Create the entry
	return await createWaitlistEntry(data);
}

/**
 * Submit step 1 of multi-step waitlist form
 * This validates and returns the data for client-side state storage
 *
 * @param data Step 1 data (email and name)
 * @returns Validated step 1 data
 */
export async function submitWaitlistStep1(
	data: WaitlistStep1Data,
): Promise<WaitlistStep1Data> {
	// Create a partial schema for validation
	const partialSchema = waitlistFormSchema.pick({
		email: true,
		name: true,
	});

	const result = partialSchema.safeParse(data);
	if (!result.success) {
		throw new ValidationError(result.error.message);
	}

	// Check if email already exists
	const existingEntry = await getWaitlistEntryByEmail(data.email);
	if (existingEntry) {
		throw new ValidationError(
			"This email is already registered in our waitlist",
		);
	}

	return data;
}

/**
 * Validate step 2 data (no database operations, just validation)
 * @param data Step 2 data
 * @returns Validated step 2 data
 */
export function validateWaitlistStep2(
	data: WaitlistStep2Data,
): WaitlistStep2Data {
	const partialSchema = waitlistFormSchema.pick({
		companyName: true,
		referralSource: true,
	});

	const result = partialSchema.safeParse(data);
	if (!result.success) {
		throw new ValidationError(result.error.message);
	}

	return data;
}

/**
 * Validate step 3 data (no database operations, just validation)
 * @param data Step 3 data
 * @returns Validated step 3 data
 */
export function validateWaitlistStep3(
	data: WaitlistStep3Data,
): WaitlistStep3Data {
	const partialSchema = waitlistFormSchema.pick({
		interestCategory: true,
		additionalInfo: true,
	});

	const result = partialSchema.safeParse(data);
	if (!result.success) {
		throw new ValidationError(result.error.message);
	}

	return data;
}
