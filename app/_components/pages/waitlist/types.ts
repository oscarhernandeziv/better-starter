import type {
	WaitlistFormData,
	WaitlistStep1Data,
	WaitlistStep2Data,
	WaitlistStep3Data,
} from "@/src/entities/models/waitlist";

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
 * Reference data for UI display
 */
export const referralOptions = [
	{ value: "social_media", label: "Social Media" },
	{ value: "friend", label: "Friend or Colleague" },
	{ value: "search_engine", label: "Search Engine" },
	{ value: "blog", label: "Blog or Article" },
	{ value: "other", label: "Other" },
] as const;

export const interestOptions = [
	{ value: "product_updates", label: "Product Updates" },
	{ value: "beta_testing", label: "Beta Testing" },
	{ value: "early_access", label: "Early Access" },
	{ value: "partnership", label: "Partnership Opportunities" },
	{ value: "investment", label: "Investment" },
] as const;
