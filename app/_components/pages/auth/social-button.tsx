"use client";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_components/utils";
import type { SocialProvider } from "@/src/domain/schemas/auth";
import { useAuthState } from "@/src/hooks/useAuthState";
import { signIn } from "@/src/lib/auth-client";

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
	className,
}: SocialButtonProps) => {
	const { setError, setSuccess, loading, setLoading, resetState } =
		useAuthState();

	const handleSignIn = async () => {
		try {
			await signIn.social(
				{ provider },
				{
					onResponse: () => setLoading(false),
					onRequest: () => {
						resetState();
						setLoading(true);
					},
					onSuccess: () => {
						setSuccess("You are logged in successfully");
					},
					onError: (ctx) => setError(ctx.error.message),
				},
			);
		} catch (error: unknown) {
			console.error(error);
			setError("Something went wrong");
		}
	};

	return (
		<Button
			variant="outline"
			onClick={handleSignIn}
			disabled={loading}
			className={cn("flex w-full items-center justify-center", className)}
		>
			<span className="mr-2">{icon}</span>
			{label}
		</Button>
	);
};
