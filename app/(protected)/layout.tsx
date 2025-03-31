import { protectRoute } from "@/src/lib/route-protection";
import type { ReactNode } from "react";

interface ProtectedLayoutProps {
	children: ReactNode;
}

/**
 * Layout for routes that require authentication
 * Uses server-side route protection instead of middleware
 * for improved security (protects against CVE-2025-29927)
 */
export default async function ProtectedLayout({
	children,
}: ProtectedLayoutProps) {
	// Server-side route protection
	await protectRoute({ redirectTo: "/sign-in" });

	return <>{children}</>;
}
