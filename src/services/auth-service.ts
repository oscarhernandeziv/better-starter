import {
	AuthenticationError,
	InvalidCredentialsError as CredentialsError,
	SessionExpiredError,
} from "@/src/entities/errors/common";
import type {
	EmailOTPSignIn,
	ProfileUpdateData,
	Session,
	User,
} from "@/src/entities/models/auth";
import { AuthRepository } from "@/src/repositories/auth-repository";
import { headers } from "next/headers";
import { auth } from "../config/auth";

export const AuthService = {
	/**
	 * Get the current user session
	 */
	async getSession() {
		try {
			const session = await auth.api.getSession({
				headers: await headers(),
			});
			return session;
		} catch (error) {
			console.error("Get session error:", error);
			return null;
		}
	},

	/**
	 * Get a user's profile by their ID
	 */
	async getUserProfile(userId: string): Promise<User | undefined> {
		if (!userId) throw new Error("User ID is required");
		return await AuthRepository.getUserById(userId);
	},

	/**
	 * Get all active sessions for a user
	 */
	async getUserSessions(userId: string): Promise<Session[]> {
		if (!userId) throw new Error("User ID is required");
		return await AuthRepository.getSessionsByUserId(userId);
	},

	/**
	 * Send an email OTP for authentication
	 */
	async sendEmailOTP(email: string) {
		if (!email) throw new Error("Email is required");

		try {
			return await auth.api.sendVerificationOTP({
				body: { email, type: "sign-in" },
				headers: await headers(),
			});
		} catch (error) {
			console.error("Send email OTP error:", error);
			throw new AuthenticationError("Failed to send verification code");
		}
	},

	/**
	 * Sign in with email and OTP
	 */
	async signInWithEmailOTP({ email, otp }: EmailOTPSignIn) {
		if (!email || !otp)
			throw new CredentialsError("Email and OTP are required");

		try {
			return await auth.api.signInEmailOTP({
				body: { email, otp },
				headers: await headers(),
			});
		} catch (error) {
			console.error("Sign in with email OTP error:", error);
			throw new CredentialsError("Invalid verification code");
		}
	},

	/**
	 * Sign in with a social provider
	 */
	async signInWithSocial(provider: "github" | "google", callbackURL?: string) {
		if (!provider) throw new Error("Provider is required");

		try {
			return await auth.api.signInSocial({
				body: { provider, callbackURL },
				headers: await headers(),
			});
		} catch (error) {
			console.error("Sign in with social error:", error);
			throw new AuthenticationError(`Failed to sign in with ${provider}`);
		}
	},

	/**
	 * Update a user's profile
	 */
	async updateUserProfile(data: ProfileUpdateData) {
		if (!data) throw new Error("Profile data is required");

		try {
			return await auth.api.updateUser({
				body: data,
				headers: await headers(),
			});
		} catch (error) {
			console.error("Update user profile error:", error);
			throw new Error("Failed to update profile");
		}
	},

	/**
	 * Sign out the current user
	 */
	async signOut() {
		try {
			return await auth.api.signOut({
				headers: await headers(),
			});
		} catch (error) {
			console.error("Sign out error:", error);
			throw new Error("Failed to sign out");
		}
	},

	/**
	 * Revoke a specific session
	 */
	async revokeSession(sessionId: string) {
		if (!sessionId) throw new Error("Session ID is required");

		try {
			return await auth.api.revokeSession({
				body: { token: sessionId },
				headers: await headers(),
			});
		} catch (error) {
			console.error("Revoke session error:", error);
			throw new SessionExpiredError("Failed to revoke session");
		}
	},

	/**
	 * Revoke all sessions for the current user
	 */
	async revokeAllSessions() {
		try {
			return await auth.api.revokeSessions({
				headers: await headers(),
			});
		} catch (error) {
			console.error("Revoke all sessions error:", error);
			throw new Error("Failed to revoke all sessions");
		}
	},

	/**
	 * Create an anonymous account
	 */
	async createAnonymousAccount() {
		try {
			return await auth.api.signInAnonymous({
				headers: await headers(),
			});
		} catch (error) {
			console.error("Create anonymous account error:", error);
			throw new AuthenticationError("Failed to create anonymous account");
		}
	},
};
