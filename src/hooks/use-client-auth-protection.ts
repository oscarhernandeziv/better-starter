"use client";

import { useSession } from "@/src/lib/auth-client";
import { useCallback } from "react";

/**
 * Type for the session returned by useSession
 * This is a simplified version to avoid dependency issues
 */
interface Session {
	user: {
		id: string;
		name: string | null;
		email: string;
		image?: string | null;
		isAnonymous?: boolean | null;
	};
}

interface UseClientAuthProtectionOptions {
	/**
	 * Callback triggered when user is authenticated
	 */
	onAuthenticated?: (session: Session) => void;

	/**
	 * Callback triggered when user is not authenticated
	 */
	onUnauthenticated?: () => void;
}

/**
 * Hook for client-side auth protection that doesn't force redirects
 * Useful for components that need to conditionally render based on auth state
 *
 * @example
 * const { isAuthenticated, isLoading, session } = useClientAuthProtection();
 *
 * if (isLoading) return <Spinner />;
 *
 * return isAuthenticated
 *   ? <AuthenticatedContent user={session.user} />
 *   : <UnauthenticatedContent />;
 */
export function useClientAuthProtection(
	options: UseClientAuthProtectionOptions = {},
) {
	const { onAuthenticated, onUnauthenticated } = options;
	const { data: session, isPending } = useSession();

	const isLoading = isPending;
	const isAuthenticated = !!session?.user;

	// Call appropriate callbacks when auth state is determined
	const handleAuthStateChange = useCallback(() => {
		if (!isLoading) {
			if (isAuthenticated && onAuthenticated && session) {
				onAuthenticated(session as Session);
			} else if (!isAuthenticated && onUnauthenticated) {
				onUnauthenticated();
			}
		}
	}, [isAuthenticated, isLoading, onAuthenticated, onUnauthenticated, session]);

	// Execute the callbacks
	handleAuthStateChange();

	return {
		isAuthenticated,
		isLoading,
		session: session as Session | null,
	};
}
