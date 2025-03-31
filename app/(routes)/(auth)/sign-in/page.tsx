import { AuthDescription } from "@/app/_components/pages/auth/auth-description";
import { SignInForm } from "@/app/_components/pages/auth/sign-in-form";
import { Layout } from "@/app/_components/shared/layout";
import { protectPublicRoute } from "@/src/lib/route-protection";

export default async function SignInPage() {
	// Server-side protection - redirects to profile if already authenticated
	await protectPublicRoute({ redirectTo: "/profile" });

	return (
		<Layout>
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<AuthDescription />
				<SignInForm />
			</div>
		</Layout>
	);
}
