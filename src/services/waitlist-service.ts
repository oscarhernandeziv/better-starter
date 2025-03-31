import { ValidationError } from "@/src/entities/errors/common";
import {
	type WaitlistFormData,
	type WaitlistStep1Data,
	type WaitlistStep2Data,
	type WaitlistStep3Data,
	waitlistSchema,
} from "@/src/entities/models/waitlist";
import {
	createWaitlistEntry,
	getWaitlistEntryByEmail,
} from "@/src/repositories/waitlist-repository";

export const WaitlistService = {
	/**
	 * Submit a complete waitlist entry
	 * @param data Complete waitlist form data
	 * @returns The created waitlist entry
	 */
	async submitWaitlistEntry(data: WaitlistFormData): Promise<boolean> {
		// Validate the data with zod schema
		const result = waitlistSchema.safeParse(data);

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
		await createWaitlistEntry(data);
		return true;
	},

	/**
	 * Validate step 1 of multi-step waitlist form
	 * This validates and returns the data for client-side state storage
	 *
	 * @param data Step 1 data (email and name)
	 * @returns Validated step 1 data
	 */
	async validateStep1(data: WaitlistStep1Data): Promise<WaitlistStep1Data> {
		// Create a partial schema for validation
		const partialSchema = waitlistSchema.pick({
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
	},

	/**
	 * Validate step 2 data (no database operations, just validation)
	 * @param data Step 2 data
	 * @returns Validated step 2 data
	 */
	validateStep2(data: WaitlistStep2Data): WaitlistStep2Data {
		const partialSchema = waitlistSchema.pick({
			companyName: true,
			referralSource: true,
		});

		const result = partialSchema.safeParse(data);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return data;
	},

	/**
	 * Validate step 3 data (no database operations, just validation)
	 * @param data Step 3 data
	 * @returns Validated step 3 data
	 */
	validateStep3(data: WaitlistStep3Data): WaitlistStep3Data {
		const partialSchema = waitlistSchema.pick({
			interestCategory: true,
			additionalInfo: true,
		});

		const result = partialSchema.safeParse(data);
		if (!result.success) {
			throw new ValidationError(result.error.message);
		}

		return data;
	},
};
