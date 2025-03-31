import { env } from "@/env";
import {
	anonymousClient,
	emailOTPClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_APP_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		anonymousClient(),
		emailOTPClient(),
	],
});

export const { signIn, signUp, signOut, useSession } = authClient;
