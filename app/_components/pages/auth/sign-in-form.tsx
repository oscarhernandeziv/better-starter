"use client";

import { AnonymousButton } from "@/app/_components/pages/auth/anonymous-button";
import { GitHubIcon, GoogleIcon } from "@/app/_components/pages/auth/icons";
import { SocialButton } from "@/app/_components/pages/auth/social-button";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
	type EmailOTPRequest,
	type EmailOTPSignIn,
	emailOTPRequestSchema,
	emailOTPSignInSchema,
} from "@/src/entities/models/auth";
import { useAuth } from "@/src/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function SignInForm() {
	// State to track if OTP has been requested
	const [otpRequested, setOtpRequested] = useState(false);
	const [email, setEmail] = useState("");
	// Use the auth hook for authentication actions and state
	const { sendOTP, signInWithOTP, isLoading, session, isSessionLoading } =
		useAuth();
	const router = useRouter();

	// Effect to handle redirection after successful login
	useEffect(() => {
		if (session?.user && !isSessionLoading) {
			router.push("/");
			router.refresh();
		}
	}, [session, isSessionLoading, router]);

	// Request OTP handler
	const handleRequestOTP = async (data: EmailOTPRequest) => {
		// Store email for the next step
		setEmail(data.email);

		const formData = new FormData();
		formData.append("email", data.email);

		// Use the sendOTP method
		sendOTP(formData);
		setOtpRequested(true);
	};

	// Verify OTP and sign in handler
	const handleVerifyOTP = async (data: EmailOTPSignIn) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("otp", data.otp);

		// Use the signInWithOTP method
		signInWithOTP(formData);
		// Redirect will happen via the useEffect hook when session is updated
	};

	// OTP Request Form
	const otpRequestForm = useForm<EmailOTPRequest>({
		resolver: zodResolver(emailOTPRequestSchema),
		defaultValues: {
			email: "",
		},
	});

	// OTP Verification Form
	const otpVerificationForm = useForm<EmailOTPSignIn>({
		resolver: zodResolver(emailOTPSignInSchema),
		defaultValues: {
			email: email,
			otp: "",
		},
	});

	// Effect to update the email field in OTP verification form when email state changes
	useEffect(() => {
		otpVerificationForm.setValue("email", email);
	}, [email, otpVerificationForm]);

	return (
		<div className="flex h-full flex-col justify-center p-6">
			<div className="mx-auto w-full max-w-md">
				<h2 className="mb-2 font-bold text-2xl">Sign In</h2>
				<p className="mb-6 text-muted-foreground">
					Choose an auth method to get started.
				</p>

				{!otpRequested ? (
					<form
						onSubmit={otpRequestForm.handleSubmit(handleRequestOTP)}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								{...otpRequestForm.register("email")}
								placeholder="email@example.com"
								disabled={isLoading}
							/>
							{otpRequestForm.formState.errors.email && (
								<p className="text-destructive text-sm">
									{otpRequestForm.formState.errors.email.message}
								</p>
							)}
						</div>

						<Button disabled={isLoading} type="submit" className="w-full">
							Continue with email
						</Button>
					</form>
				) : (
					<form
						onSubmit={otpVerificationForm.handleSubmit(handleVerifyOTP)}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								{...otpVerificationForm.register("email")}
								disabled={true}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="otp">One-Time Password</Label>
							<Input
								id="otp"
								{...otpVerificationForm.register("otp")}
								placeholder="Enter OTP from your email"
								disabled={isLoading}
							/>
							{otpVerificationForm.formState.errors.otp && (
								<p className="text-destructive text-sm">
									{otpVerificationForm.formState.errors.otp.message}
								</p>
							)}
							<div className="flex justify-end">
								<Button
									type="button"
									variant="link"
									className="h-auto p-0 text-primary text-xs"
									onClick={() => {
										const formData = new FormData();
										formData.append("email", email);
										sendOTP(formData);
									}}
								>
									Resend OTP
								</Button>
							</div>
						</div>

						<Button disabled={isLoading} type="submit" className="w-full">
							Complete Sign In
						</Button>

						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => {
								setOtpRequested(false);
							}}
						>
							Back
						</Button>
					</form>
				)}

				{/* Or Divider */}
				<div className="relative mt-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-gray-300 border-t" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				{/* Social Buttons */}
				<div className="mt-4 space-y-2">
					<SocialButton
						provider="github"
						icon={<GitHubIcon />}
						label="Sign in with GitHub"
					/>

					<SocialButton
						provider="google"
						icon={<GoogleIcon />}
						label="Sign in with Google"
					/>
				</div>

				{/* Guest Login Option */}
				<div className="mt-4">
					<AnonymousButton />
				</div>
			</div>
		</div>
	);
}
