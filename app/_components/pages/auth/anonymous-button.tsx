"use client";

import { Button } from "@/app/_components/ui/button";
import { useAuthState } from "@/src/hooks/useAuthState";
import { signIn } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export function AnonymousButton() {
	const router = useRouter();
	const { setError, setLoading, loading, resetState } = useAuthState();

	const handleAnonymousSignIn = async () => {
		try {
			resetState();
			setLoading(true);

			const result = await signIn.anonymous();

			if (result.error) {
				setError(result.error.message || "Failed to sign in anonymously");
			} else {
				router.push("/");
			}
		} catch (error) {
			console.error("Error during anonymous sign in:", error);
			setError("Failed to sign in anonymously");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant="ghost"
			onClick={handleAnonymousSignIn}
			disabled={loading}
			className="w-full"
		>
			Continue as Guest
		</Button>
	);
}
