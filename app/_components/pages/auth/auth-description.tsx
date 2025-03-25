export function AuthDescription() {
	return (
		<div className="flex h-full flex-col border-border border-t p-6 md:border-t-0 md:border-l">
			<h3 className="mb-4 font-bold text-lg">Authentication Options</h3>
			<p className="mb-4 text-sm leading-relaxed">
				Better Starter includes a complete authentication system with multiple
				secure options to fit your project requirements:
			</p>
			<ul className="list-disc space-y-2 pl-5 text-sm">
				<li>Email/Password authentication with secure password hashing</li>
				<li>OAuth integration with popular providers (Google, GitHub, etc.)</li>
				<li>Passwordless magic link authentication</li>
				<li>Two-factor authentication (2FA) for enhanced security</li>
				<li>Role-based access control with custom permissions</li>
				<li>JWT token handling with secure HttpOnly cookies</li>
				<li>Session management with automatic expiration</li>
				<li>CSRF protection built-in</li>
			</ul>
		</div>
	);
}
