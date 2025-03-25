"use client";

import { Alert } from "@/app/_components/ui/alert";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function SignInForm() {
	const [isLoading] = useState(false);
	const [error] = useState<string | null>(null);

	return (
		<div className="flex h-full justify-center border-border p-6">
			<div className="w-full max-w-md">
				<p className="mb-6 text-muted-foreground text-sm leading-relaxed">
					Sign in to access all features and explore the full capabilities of
					Better Starter.
				</p>

				{error && (
					<Alert variant="destructive" className="mb-4">
						{error}
					</Alert>
				)}

				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Enter your email"
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/forgot-password"
								className="text-primary text-xs hover:underline"
							>
								Forgot password?
							</Link>
						</div>
						<input
							id="password"
							name="password"
							type="password"
							required
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Enter your password"
							disabled={isLoading}
						/>
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign In with Email"}
					</Button>

					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-border border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						className="w-full"
						disabled={isLoading}
					>
						<svg
							viewBox="0 0 24 24"
							className="mr-2 h-4 w-4"
							aria-label="GitHub"
							aria-hidden="true"
						>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						GitHub
					</Button>

					<div className="mt-6 text-center text-muted-foreground text-sm">
						<p>
							Don't have an account?{" "}
							<Link href="/sign-up" className="text-primary hover:underline">
								Sign up
							</Link>
						</p>
					</div>

					<div className="text-center text-muted-foreground text-xs">
						<p>Demo account: demo@example.com / password</p>
					</div>
				</form>
			</div>
		</div>
	);
}
