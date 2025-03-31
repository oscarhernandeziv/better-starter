"use client";

import { Button } from "@/app/_components/ui/button";
import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AnonymousButton() {
	const router = useRouter();
	const { createAnonymousAccount, isLoading, session, isSessionLoading } =
		useAuth();

	// Effect to redirect after successful login
	useEffect(() => {
		// Check if we have a valid session and it's not loading
		if (session?.user && !isSessionLoading) {
			router.push("/dashboard");
			router.refresh();
		}
	}, [session, isSessionLoading, router]);

	const handleAnonymousSignIn = () => {
		createAnonymousAccount();
		// Redirect will happen via the useEffect hook when session is updated
	};

	return (
		<Button
			variant="ghost"
			onClick={handleAnonymousSignIn}
			disabled={isLoading}
			className="w-full"
		>
			Continue as Guest
		</Button>
	);
}
