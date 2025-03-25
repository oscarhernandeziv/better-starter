import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { anonymous, emailOTP, twoFactor } from "better-auth/plugins";
import { env } from "../config/env";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { resend } from "../helpers/email/resend";

export const auth = betterAuth({
	appName: "better-starter",

	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: schema,
	}),

	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
			redirectUri: `${env.BETTER_AUTH_URL}/api/auth/callback/github`,
		},
	},

	plugins: [
		twoFactor({
			otpOptions: {
				async sendOTP({ user, otp }) {
					await resend.emails.send({
						from: "Better Starter <onboarding@resend.dev>",
						to: user.email,
						subject: "Your OTP for Better Starter",
						text: `Your OTP is ${otp}`,
					});
				},
			},
			skipVerificationOnEnable: true,
		}),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				if (type === "sign-in") {
					await resend.emails.send({
						from: "Acme <onboarding@resend.dev>",
						to: email,
						subject: "Sign In OTP",
						html: `Your OTP Code is ${otp}`,
					});
				} else if (type === "email-verification") {
					await resend.emails.send({
						from: "Acme <onboarding@resend.dev>",
						to: email,
						subject: "Email Verification OTP",
						html: `Your OTP Code is ${otp}`,
					});
				} else {
					await resend.emails.send({
						from: "Acme <onboarding@resend.dev>",
						to: email,
						subject: "Password Reset OTP",
						html: `Your OTP Code is ${otp}`,
					});
				}
			},
		}),
		anonymous({
			emailDomainName: "example.com",
		}),
		nextCookies(),
	],
});
