export function AuthDescription() {
	return (
		<div className="h-full p-6">
			<h3 className="mb-4 font-bold text-lg">Authentication Options</h3>
			<p className="mb-4 text-muted-foreground text-sm">
				Better Starter includes a complete authentication system with multiple
				options:
			</p>
			<ul className="list-disc space-y-2 pl-5 text-sm">
				<li>Email/Password authentication</li>
				<li>OAuth providers (Google, GitHub, etc.)</li>
				<li>Magic link authentication</li>
				<li>Two-factor authentication (2FA)</li>
				<li>Role-based access control</li>
				<li>JWT token handling with secure HttpOnly cookies</li>
			</ul>
		</div>
	);
}
