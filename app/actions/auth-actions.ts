"use server";

import { UnauthorizedError } from "@/src/entities/errors/common";
import {
	emailOTPRequestSchema,
	emailOTPSignInSchema,
	profileUpdateSchema,
} from "@/src/entities/models/auth";
import {
	type Result,
	handleAsync,
	handleAuthenticatedAsync,
} from "@/src/lib/result";
import { AuthService } from "@/src/services/auth-service";
import { redirect } from "next/navigation";

export async function getSession() {
	return await AuthService.getSession();
}

export async function requireSession() {
	const session = await getSession();
	if (!session?.user) {
		throw new UnauthorizedError();
	}

	// Ensure the session has the correct shape
	return {
		user: session.user,
		expires: new Date(
			session.session?.expiresAt || Date.now() + 24 * 60 * 60 * 1000,
		),
	};
}

export async function getUserSessions() {
	try {
		const session = await requireSession();
		const userSessions = await AuthService.getUserSessions(session.user.id);
		return userSessions;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			redirect("/sign-in");
		}
		throw error;
	}
}

export async function sendEmailOTP(
	formData: FormData,
): Promise<Result<unknown>> {
	return handleAsync(
		async () => {
			const email = formData.get("email") as string;
			const validatedFields = emailOTPRequestSchema.parse({ email });
			return await AuthService.sendEmailOTP(validatedFields.email);
		},
		{ errorContext: "Send email OTP" },
	);
}

export async function signInWithEmailOTP(
	formData: FormData,
): Promise<Result<unknown>> {
	return handleAsync(
		async () => {
			const email = formData.get("email") as string;
			const otp = formData.get("otp") as string;
			const validatedFields = emailOTPSignInSchema.parse({ email, otp });
			return await AuthService.signInWithEmailOTP(validatedFields);
		},
		{ errorContext: "Sign in with email OTP" },
	);
}

export async function signInWithSocial(
	provider: "github" | "google",
	callbackURL?: string,
): Promise<Result<unknown>> {
	return handleAsync(
		async () => {
			return await AuthService.signInWithSocial(provider, callbackURL);
		},
		{ errorContext: `Sign in with ${provider}` },
	);
}

export async function updateUserProfile(
	formData: FormData,
): Promise<Result<unknown>> {
	return handleAuthenticatedAsync(
		async () => {
			const session = await requireSession();
			const name = formData.get("name") as string;
			const image = (formData.get("image") as string) || null;
			const validatedFields = profileUpdateSchema.parse({ name, image });
			return await AuthService.updateUserProfile(validatedFields);
		},
		"/sign-in",
		"Update profile",
	);
}

export async function signOut(): Promise<Result<boolean>> {
	return handleAuthenticatedAsync(
		async () => {
			await requireSession();
			await AuthService.signOut();
			return true;
		},
		"/sign-in",
		"Sign out",
	);
}

export async function revokeSession(
	sessionId: string,
): Promise<Result<boolean>> {
	return handleAuthenticatedAsync(
		async () => {
			await requireSession();
			await AuthService.revokeSession(sessionId);
			return true;
		},
		"/sign-in",
		"Revoke session",
	);
}

export async function revokeAllSessions(): Promise<Result<boolean>> {
	return handleAuthenticatedAsync(
		async () => {
			await requireSession();
			await AuthService.revokeAllSessions();
			return true;
		},
		"/sign-in",
		"Revoke all sessions",
	);
}

export async function createAnonymousAccount(): Promise<Result<unknown>> {
	return handleAsync(
		async () => {
			return await AuthService.createAnonymousAccount();
		},
		{ errorContext: "Create anonymous account" },
	);
}
