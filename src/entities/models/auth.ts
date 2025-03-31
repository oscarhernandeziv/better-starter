import { z } from "zod";

/**
 * User Schema - defines the core User entity with all properties
 */
export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	emailVerified: z.boolean(),
	image: z.string().url().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
	twoFactorEnabled: z.boolean().optional(),
	isAnonymous: z.boolean().optional(),
});

export type User = z.infer<typeof userSchema>;

/**
 * Session Schema - defines the authentication session entity
 */
export const sessionSchema = z.object({
	id: z.string(),
	expiresAt: z.date(),
	token: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	ipAddress: z.string().nullable().optional(),
	userAgent: z.string().nullable().optional(),
	userId: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;

/**
 * Account Schema - defines the authentication provider account entity
 */
export const accountSchema = z.object({
	id: z.string(),
	accountId: z.string(),
	providerId: z.string(),
	userId: z.string(),
	accessToken: z.string().nullable().optional(),
	refreshToken: z.string().nullable().optional(),
	idToken: z.string().nullable().optional(),
	accessTokenExpiresAt: z.date().nullable().optional(),
	refreshTokenExpiresAt: z.date().nullable().optional(),
	scope: z.string().nullable().optional(),
	password: z.string().nullable().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Account = z.infer<typeof accountSchema>;

/**
 * Verification Schema - defines the verification token entity
 */
export const verificationSchema = z.object({
	id: z.string(),
	identifier: z.string(),
	value: z.string(),
	expiresAt: z.date(),
	createdAt: z.date().nullable().optional(),
	updatedAt: z.date().nullable().optional(),
});

export type Verification = z.infer<typeof verificationSchema>;

/**
 * Auth Session Schema - defines the session info returned to the client
 */
export const authSessionSchema = z.object({
	user: userSchema,
	expires: z.date(),
});

export type AuthSession = z.infer<typeof authSessionSchema>;

/**
 * Email OTP Request Schema - for initiating OTP
 */
export const emailOTPRequestSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
});

export type EmailOTPRequest = z.infer<typeof emailOTPRequestSchema>;

/**
 * Email OTP Sign In Schema - for verifying OTP
 */
export const emailOTPSignInSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
	otp: z
		.string()
		.min(1, "OTP is required")
		.max(8, "OTP cannot be longer than 8 characters"),
});

export type EmailOTPSignIn = z.infer<typeof emailOTPSignInSchema>;

/**
 * Profile Update Schema - for updating user profile
 */
export const profileUpdateSchema = z.object({
	name: z.string().min(1, "Name is required"),
	image: z.string().url("Must be a valid URL").optional().nullable(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

/**
 * Create User Schema - for user creation during authentication
 */
export const createUserSchema = userSchema
	.pick({
		id: true,
		email: true,
		name: true,
	})
	.partial({ name: true })
	.extend({
		password: z.string().min(6).optional(),
		isAnonymous: z.boolean().optional(),
	});

export type CreateUser = z.infer<typeof createUserSchema>;

/**
 * Supported social login providers
 */
export const socialProviderSchema = z.enum(["github", "google"]);

export type SocialProvider = z.infer<typeof socialProviderSchema>;

/**
 * Social Login Options Schema
 */
export const socialLoginOptionsSchema = z.object({
	provider: socialProviderSchema,
	callbackURL: z.string().url().optional(),
});

export type SocialLoginOptions = z.infer<typeof socialLoginOptionsSchema>;
