"use client";
import { AuthDescription } from "@/app/_components/pages/auth/auth-description";
import { SignUpForm } from "@/app/_components/pages/auth/sign-up-form";
import { Layout } from "@/app/_components/shared/layout";

export default function SignUpPage() {
	return (
		<Layout defaultSection="04" defaultSubSection="4.2">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<SignUpForm />
				<AuthDescription />
			</div>
		</Layout>
	);
}
