"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AnonymousButton } from "@/app/_components/pages/auth/anonymous-button";
import {
	FormError,
	FormSuccess,
} from "@/app/_components/pages/auth/form-feedback";
import { GitHubIcon, GoogleIcon } from "@/app/_components/pages/auth/icons";
import { SocialButton } from "@/app/_components/pages/auth/social-button";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
	type EmailOTPRequest,
	EmailOTPRequestSchema,
	type EmailOTPSignIn,
	EmailOTPSignInSchema,
} from "@/src/domain/schemas/auth";
import {
	requestEmailOTP,
	signInWithEmailOTP,
} from "@/src/helpers/auth/email-otp";
import { useAuthState } from "@/src/hooks/useAuthState";

export function SignInForm() {
	// State to track if OTP has been requested
	const [otpRequested, setOtpRequested] = useState(false);
	const [email, setEmail] = useState("");

	// Router instance for navigation
	const router = useRouter();

	// Authentication state hooks for managing feedback and loading state
	const {
		error,
		success,
		loading,
		setSuccess,
		setError,
		setLoading,
		resetState,
	} = useAuthState();

	// Request OTP handler
	const handleRequestOTP = async (data: EmailOTPRequest) => {
		resetState();
		setLoading(true);

		try {
			const response = await requestEmailOTP(data.email);

			if (response?.data) {
				setEmail(data.email);
				setSuccess("OTP has been sent to your email.");
				setOtpRequested(true);
			} else if (response?.error) {
				setError(response.error.message);
			}
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// Verify OTP and sign in handler
	const handleVerifyOTP = async (data: EmailOTPSignIn) => {
		resetState();
		setLoading(true);

		try {
			const response = await signInWithEmailOTP(data.email, data.otp);

			if (response?.data) {
				setSuccess("Logged in successfully.");
				router.replace("/profile");
			} else if (response?.error) {
				setError(response.error.message);
			}
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	// OTP Request Form
	const otpRequestForm = useForm<EmailOTPRequest>({
		resolver: zodResolver(EmailOTPRequestSchema),
		defaultValues: {
			email: "",
		},
	});

	// OTP Verification Form
	const otpVerificationForm = useForm<EmailOTPSignIn>({
		resolver: zodResolver(EmailOTPSignInSchema),
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
								disabled={loading}
							/>
							{otpRequestForm.formState.errors.email && (
								<p className="text-destructive text-sm">
									{otpRequestForm.formState.errors.email.message}
								</p>
							)}
						</div>

						<FormError message={error} />
						<FormSuccess message={success} />

						<Button disabled={loading} type="submit" className="w-full">
							Send OTP
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
								disabled={loading}
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
									onClick={async () => {
										await handleRequestOTP({ email });
									}}
								>
									Resend OTP
								</Button>
							</div>
						</div>

						<FormError message={error} />
						<FormSuccess message={success} />

						<Button disabled={loading} type="submit" className="w-full">
							Verify OTP & Sign In
						</Button>

						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => {
								resetState();
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
