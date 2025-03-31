import { z } from "zod";

/**
 * Schema for validating waitlist form data
 */
export const waitlistSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	name: z.string().min(1, "Name is required"),
	companyName: z.string().optional(),
	referralSource: z
		.enum(["social_media", "friend", "search_engine", "blog", "other"])
		.optional(),
	interestCategory: z
		.enum([
			"product_updates",
			"beta_testing",
			"early_access",
			"partnership",
			"investment",
		])
		.optional(),
	additionalInfo: z
		.string()
		.max(500, "Additional information must be less than 500 characters")
		.optional(),
	status: z.enum(["pending", "approved", "rejected"]).optional(),
});

/**
 * Step 1 schema for email and name only
 */
export const waitlistStep1Schema = waitlistSchema.pick({
	email: true,
	name: true,
});

/**
 * Step 2 schema for company and referral information
 */
export const waitlistStep2Schema = waitlistSchema.pick({
	companyName: true,
	referralSource: true,
});

/**
 * Step 3 schema for interest and additional information
 */
export const waitlistStep3Schema = waitlistSchema.pick({
	interestCategory: true,
	additionalInfo: true,
});

/**
 * Type definitions derived from schemas
 */
export type WaitlistFormData = z.infer<typeof waitlistSchema>;
export type WaitlistStep1Data = z.infer<typeof waitlistStep1Schema>;
export type WaitlistStep2Data = z.infer<typeof waitlistStep2Schema>;
export type WaitlistStep3Data = z.infer<typeof waitlistStep3Schema>;

/**
 * Type for waitlist step in the multi-step form process
 */
export type WaitlistStep = 1 | 2 | 3 | "success";
