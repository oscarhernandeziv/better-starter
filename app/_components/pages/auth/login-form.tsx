import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";

export function LoginForm() {
	return (
		<div className="flex h-full items-center justify-center border-border border-r p-6">
			<div className="w-full max-w-md">
				<p className="mb-6 text-sm leading-relaxed">
					Sign in to access all features and explore the full capabilities of Better Starter.
				</p>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<input
							id="email"
							type="email"
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Enter your email"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<input
							id="password"
							type="password"
							className="w-full border border-border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-muted-foreground"
							placeholder="Enter your password"
						/>
					</div>

					<Button className="w-full">Sign In</Button>

					<div className="text-center text-muted-foreground text-xs">
						<p>Demo account: demo@example.com / password</p>
					</div>
				</div>
			</div>
		</div>
	);
}
