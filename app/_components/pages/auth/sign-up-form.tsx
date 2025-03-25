"use client";

import { Alert } from "@/app/_components/ui/alert";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function SignUpForm() {
	const [isLoading] = useState(false);
	const [error] = useState<string | null>(null);
	const [success] = useState<string | null>(null);

	return (
		<div className="flex h-full justify-center border-border p-6">
			<div className="w-full max-w-md">
				<p className="mb-6 text-muted-foreground text-sm leading-relaxed">
					Sign up to access all features and explore the full capabilities of
					Better Starter.
				</p>

				{error && (
					<Alert variant="destructive" className="mb-4">
						{error}
					</Alert>
				)}

				{success && (
					<Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
						{success}
					</Alert>
				)}

				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Full Name</Label>
						<input
							id="name"
							name="name"
							type="text"
							required
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Enter your full name"
							disabled={isLoading || !!success}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Enter your email"
							disabled={isLoading || !!success}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<input
							id="password"
							name="password"
							type="password"
							required
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Create a password"
							minLength={8}
							disabled={isLoading || !!success}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Confirm your password"
							minLength={8}
							disabled={isLoading || !!success}
						/>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={isLoading || !!success}
					>
						{isLoading ? "Creating Account..." : "Sign Up"}
					</Button>

					<div className="mt-6 text-center text-muted-foreground text-sm">
						<p>
							Already have an account?{" "}
							<Link href="/sign-in" className="text-primary hover:underline">
								Sign in
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
