import {
	anonymousClient,
	emailOTPClient,
	inferAdditionalFields,
	twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "../config/env";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		anonymousClient(),
		emailOTPClient(),
		twoFactorClient(),
	],
});

export const { signIn, signUp, signOut, useSession } = authClient;
