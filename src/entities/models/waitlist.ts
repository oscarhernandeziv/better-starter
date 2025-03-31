import { z } from "zod";

/**
 * Schema for validating waitlist form data
 */
export const waitlistFormSchema = z.object({
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
});

/**
 * Step 1 schema for email and name only
 */
export const waitlistStep1Schema = waitlistFormSchema.pick({
	email: true,
	name: true,
});

/**
 * Step 2 schema for company and referral information
 */
export const waitlistStep2Schema = waitlistFormSchema.pick({
	companyName: true,
	referralSource: true,
});

/**
 * Step 3 schema for interest and additional information
 */
export const waitlistStep3Schema = waitlistFormSchema.pick({
	interestCategory: true,
	additionalInfo: true,
});

/**
 * Type definitions derived from schemas
 */
export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;
export type WaitlistStep1Data = z.infer<typeof waitlistStep1Schema>;
export type WaitlistStep2Data = z.infer<typeof waitlistStep2Schema>;
export type WaitlistStep3Data = z.infer<typeof waitlistStep3Schema>;

/**
 * Type for waitlist entry status
 */
export type WaitlistStatus = "pending" | "approved" | "rejected";

/**
 * Type for complete waitlist entry from database
 */
export interface WaitlistEntry extends WaitlistFormData {
	id: number;
	createdAt: string;
	status: WaitlistStatus;
}

/**
 * Reference data for UI display
 */
export const referralOptions = [
	{ value: "social_media", label: "Social Media" },
	{ value: "friend", label: "Friend or Colleague" },
	{ value: "search_engine", label: "Search Engine" },
	{ value: "blog", label: "Blog or Article" },
	{ value: "other", label: "Other" },
];

export const interestOptions = [
	{ value: "product_updates", label: "Product Updates" },
	{ value: "beta_testing", label: "Beta Testing" },
	{ value: "early_access", label: "Early Access" },
	{ value: "partnership", label: "Partnership Opportunities" },
	{ value: "investment", label: "Investment" },
];

/**
 * Component props interfaces
 */
export interface WaitlistStep1Props {
	defaultValues?: Partial<WaitlistStep1Data>;
	onSubmit: (data: WaitlistStep1Data) => Promise<void>;
	isSubmitting: boolean;
}

export interface WaitlistStep2Props {
	defaultValues?: Partial<WaitlistStep2Data>;
	onSubmit: (data: WaitlistStep2Data) => Promise<void>;
	onBack: () => void;
	isSubmitting: boolean;
}

export interface WaitlistStep3Props {
	defaultValues?: Partial<WaitlistStep3Data>;
	onSubmit: (data: WaitlistStep3Data) => Promise<void>;
	onBack: () => void;
	isSubmitting: boolean;
}

export interface WaitlistSuccessProps {
	data: WaitlistFormData;
	onReset: () => void;
}

/**
 * Waitlist step type for the multi-step form process
 */
export type WaitlistStep = 1 | 2 | 3 | "success";
