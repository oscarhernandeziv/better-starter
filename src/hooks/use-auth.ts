"use client";

import {
	createAnonymousAccount,
	getSession,
	revokeAllSessions,
	revokeSession,
	sendEmailOTP,
	signInWithEmailOTP,
	signInWithSocial as signInWithSocialAction,
	signOut,
	updateUserProfile,
} from "@/app/actions/auth-actions";
import { useResult } from "@/src/hooks/use-result";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook for authentication operations
 * Provides reactive state management for auth operations and handles errors consistently
 */
export function useAuth() {
	const queryClient = useQueryClient();
	const { createMutation, handle } = useResult();

	// Session query with optimized configuration for auth state
	const sessionQuery = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 60 * 60 * 1000, // 1 hour (replaces cacheTime in v5)
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});

	// Email OTP send mutation
	const sendOTPMutation = createMutation(
		(formData: FormData) => {
			return sendEmailOTP(formData);
		},
		{
			loadingMessage: "Sending verification code...",
			getSuccessMessage: () => "Verification code sent to your email",
			getErrorMessage: (error) =>
				error.message || "Failed to send verification code",
			minimumLoadingTime: 1000, // Longer minimum for email operations to indicate external processing
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
				},
			},
			defaultErrorMessage: "Failed to send verification code",
		},
	);

	// Email OTP sign-in mutation
	const signInWithOTPMutation = createMutation(
		(formData: FormData) => {
			return signInWithEmailOTP(formData);
		},
		{
			loadingMessage: "Signing in...",
			getSuccessMessage: () => "Signed in successfully",
			getErrorMessage: (error) => error.message || "Failed to sign in",
			minimumLoadingTime: 600, // Security-related operation should feel deliberate
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
				},
			},
			defaultErrorMessage: "Failed to sign in",
		},
	);

	// Social sign-in mutation
	const signInWithSocialMutation = createMutation(
		({
			provider,
			callbackURL,
		}: { provider: "github" | "google"; callbackURL?: string }) => {
			return signInWithSocialAction(provider, callbackURL);
		},
		{
			loadingMessage: "Connecting to authentication provider...",
			getSuccessMessage: () => "Redirecting to authentication provider...",
			getErrorMessage: (error) =>
				error.message || "Failed to connect to authentication provider",
			minimumLoadingTime: 500, // Add minimum loading time for OAuth redirection setup
			resultOptions: {
				onSuccess: () => {
					// The browser will automatically redirect to the provider's auth page
				},
			},
			defaultErrorMessage: "Failed to connect to authentication provider",
		},
	);

	// Update user profile mutation
	const updateProfileMutation = createMutation(
		(formData: FormData) => {
			return updateUserProfile(formData);
		},
		{
			loadingMessage: "Updating profile...",
			getSuccessMessage: () => "Profile updated successfully",
			getErrorMessage: (error) => error.message || "Failed to update profile",
			minimumLoadingTime: 500, // User profile updates should feel substantial
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
				},
			},
			defaultErrorMessage: "Failed to update profile",
		},
	);

	// Sign out mutation
	const signOutMutation = createMutation(
		() => {
			return signOut();
		},
		{
			loadingMessage: "Signing out...",
			getSuccessMessage: () => "Signed out successfully",
			getErrorMessage: (error) => error.message || "Failed to sign out",
			minimumLoadingTime: 500, // Security operation should feel deliberate
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
				},
			},
			defaultErrorMessage: "Failed to sign out",
		},
	);

	// Revoke session mutation
	const revokeSessionMutation = createMutation(
		(sessionId: string) => {
			return revokeSession(sessionId);
		},
		{
			loadingMessage: "Revoking session...",
			getSuccessMessage: () => "Session revoked successfully",
			getErrorMessage: (error) => error.message || "Failed to revoke session",
			minimumLoadingTime: 550, // Security-related operation with importance
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
					queryClient.invalidateQueries({ queryKey: ["sessions"] });
				},
			},
			defaultErrorMessage: "Failed to revoke session",
		},
	);

	// Revoke all sessions mutation
	const revokeAllSessionsMutation = createMutation(
		() => {
			return revokeAllSessions();
		},
		{
			loadingMessage: "Revoking all sessions...",
			getSuccessMessage: () => "All sessions revoked successfully",
			getErrorMessage: (error) =>
				error.message || "Failed to revoke all sessions",
			minimumLoadingTime: 700, // Critical security operation should feel substantial
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
					queryClient.invalidateQueries({ queryKey: ["sessions"] });
				},
			},
			defaultErrorMessage: "Failed to revoke all sessions",
		},
	);

	// Create anonymous account mutation
	const createAnonymousAccountMutation = createMutation(
		() => {
			return createAnonymousAccount();
		},
		{
			loadingMessage: "Creating anonymous account...",
			getSuccessMessage: () => "Anonymous account created",
			getErrorMessage: (error) =>
				error.message || "Failed to create anonymous account",
			minimumLoadingTime: 500, // Account creation should feel substantial
			resultOptions: {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["session"] });
				},
			},
			defaultErrorMessage: "Failed to create anonymous account",
		},
	);

	// Get session and user data safely
	const session = sessionQuery.data;
	const user = session?.user || null;

	// Track error and success states from mutations
	const authError =
		sendOTPMutation.error ||
		signInWithOTPMutation.error ||
		signInWithSocialMutation.error ||
		updateProfileMutation.error ||
		signOutMutation.error ||
		revokeSessionMutation.error ||
		revokeAllSessionsMutation.error ||
		createAnonymousAccountMutation.error;

	const isLoading =
		sendOTPMutation.isPending ||
		signInWithOTPMutation.isPending ||
		signInWithSocialMutation.isPending ||
		updateProfileMutation.isPending ||
		signOutMutation.isPending ||
		revokeSessionMutation.isPending ||
		revokeAllSessionsMutation.isPending ||
		createAnonymousAccountMutation.isPending;

	return {
		// Session data
		session,
		user,
		isSessionLoading: sessionQuery.isLoading,
		isSessionError: sessionQuery.isError,

		// Auth methods
		sendOTP: sendOTPMutation.mutate,
		signInWithOTP: signInWithOTPMutation.mutate,
		signInWithSocial: async (
			provider: "github" | "google",
			callbackURL?: string,
		) => {
			const result = await signInWithSocialMutation.mutateAsync({
				provider,
				callbackURL,
			});
			return handle(result);
		},
		updateProfile: updateProfileMutation.mutate,
		signOut: () => signOutMutation.mutate(),
		revokeSession: revokeSessionMutation.mutate,
		revokeAllSessions: () => revokeAllSessionsMutation.mutate(),
		createAnonymousAccount: () => createAnonymousAccountMutation.mutate(),

		// Common state
		isLoading,
		authError,
	};
}
