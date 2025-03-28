"use client";
import { AuthDescription } from "@/app/_components/pages/auth/auth-description";
import { SignInForm } from "@/app/_components/pages/auth/sign-in-form";
import { Layout } from "@/app/_components/shared/layout";

export default function SignInPage() {
	return (
		<Layout defaultSection="signIn">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<AuthDescription />
				<SignInForm />
			</div>
		</Layout>
	);
}
