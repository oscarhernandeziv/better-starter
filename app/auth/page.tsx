"use client";
import { AuthDescription } from "@/app/_components/pages/auth/auth-description";
import { LoginForm } from "@/app/_components/pages/auth/login-form";
import { Layout } from "@/app/_components/shared/layout";

export default function AuthPage() {
	return (
		<Layout defaultSection="05">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<LoginForm />
				<AuthDescription />
			</div>
		</Layout>
	);
}
