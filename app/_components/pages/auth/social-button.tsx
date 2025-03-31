"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_components/utils";
import type { SocialProvider } from "@/src/entities/models/auth";
import { useAuth } from "@/src/hooks/use-auth";

interface SocialButtonProps {
	provider: SocialProvider;
	icon: React.ReactNode;
	label: string;
	callbackURL?: string;
	className?: string;
}

export const SocialButton = ({
	provider,
	icon,
	label,
	callbackURL,
	className,
}: SocialButtonProps) => {
	const { signInWithSocial, isLoading } = useAuth();

	const handleSignIn = async () => {
		try {
			// Use root path as callback URL if not provided
			const generatedCallbackURL = callbackURL || "/";

			// Call the signInWithSocial method with the provider and callback URL
			const result = await signInWithSocial(provider, generatedCallbackURL);

			// If we get a redirect URL in the result, redirect the browser
			if (result && typeof result === "object" && "url" in result) {
				window.location.href = result.url as string;
			}
		} catch (error: unknown) {
			console.error("Error during social sign in:", error);
		}
	};

	return (
		<Button
			variant="outline"
			onClick={handleSignIn}
			disabled={isLoading}
			className={cn("flex w-full items-center justify-center", className)}
		>
			<span className="mr-2">{icon}</span>
			{label}
		</Button>
	);
};
