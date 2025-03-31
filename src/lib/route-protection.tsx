import { getSession } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";

/**
 * Route protection utility that works at the server component level
 * instead of using middleware, which is vulnerable to CVE-2025-29927
 */
export async function protectRoute({
	redirectTo = "/sign-in",
}: {
	redirectTo?: string;
}) {
	const session = await getSession();

	if (!session?.user) {
		redirect(redirectTo);
	}

	return session;
}

/**
 * Route protection for public routes that should redirect authenticated users
 */
export async function protectPublicRoute({
	redirectTo = "/dashboard",
}: {
	redirectTo?: string;
}) {
	const session = await getSession();

	if (session?.user) {
		redirect(redirectTo);
	}

	return null;
}
