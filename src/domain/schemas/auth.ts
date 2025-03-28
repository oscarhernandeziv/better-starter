import { z } from "zod";

// Email OTP Request Schema - for initiating OTP
export const EmailOTPRequestSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
});

// Email OTP Sign In Schema - for verifying OTP
export const EmailOTPSignInSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
	otp: z
		.string()
		.min(1, "OTP is required")
		.max(8, "OTP cannot be longer than 8 characters"),
});

export const ProfileUpdateSchema = z.object({
	name: z.string().min(1, "Name is required"),
	image: z.string().url("Must be a valid URL").optional().nullable(),
});

export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;

// Types inferred from schemas
export type EmailOTPRequest = z.infer<typeof EmailOTPRequestSchema>;
export type EmailOTPSignIn = z.infer<typeof EmailOTPSignInSchema>;

// Social Login Types
export type SocialProvider = "github" | "google";

export interface SocialLoginOptions {
	provider: SocialProvider;
	callbackURL?: string;
}
