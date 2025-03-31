import { env } from "@/src/config/env";
import { resend } from "@/src/config/resend";
import { db } from "@/src/db";
import * as schema from "@/src/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { anonymous, emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
	appName: "better-starter",

	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: schema,
	}),

	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID as string,
			clientSecret: env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID as string,
			clientSecret: env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	plugins: [
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				if (type === "sign-in") {
					await resend.emails.send({
						from: "Acme <onboarding@resend.dev>",
						to: email,
						subject: "Sign In OTP",
						html: `
							<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
								<h2>Sign In to Better Starter</h2>
								<p>Your one-time password (OTP) is:</p>
								<div style="font-size: 24px; font-weight: bold; padding: 12px; background-color: #f4f4f4; border-radius: 4px; margin: 12px 0; text-align: center;">
									${otp}
								</div>
								<p>This code will expire in 10 minutes.</p>
								<p>If you didn't request this code, you can safely ignore this email.</p>
							</div>
						`,
					});
				} else if (type === "email-verification") {
					await resend.emails.send({
						from: "Acme <onboarding@resend.dev>",
						to: email,
						subject: "Email Verification OTP",
						html: `
							<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
								<h2>Verify Your Email Address</h2>
								<p>Your one-time password (OTP) for email verification is:</p>
								<div style="font-size: 24px; font-weight: bold; padding: 12px; background-color: #f4f4f4; border-radius: 4px; margin: 12px 0; text-align: center;">
									${otp}
								</div>
								<p>This code will expire in 10 minutes.</p>
								<p>If you didn't request this code, you can safely ignore this email.</p>
							</div>
						`,
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
