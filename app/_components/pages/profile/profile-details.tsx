"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { authClient, useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export function ProfileDetails() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div className="flex h-full flex-col border-border border-t bg-muted/40 p-6 md:border-t-0 md:border-l">
			<h3 className="mb-4 font-bold text-lg">Account Information</h3>

			<Card className="w-full max-w-md">
				<CardContent className="flex flex-col gap-4 p-6">
					<div className="flex items-center justify-between">
						<CardTitle className="text-xl">Profile</CardTitle>
						<Button
							variant="outline"
							onClick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => router.push("/"),
									},
								});
							}}
						>
							Sign Out
						</Button>
					</div>

					{session ? (
						<div className="space-y-4">
							<h2 className="font-medium text-lg">
								Welcome, {session.user.name || "User"}!
							</h2>
							<div className="rounded-md bg-muted p-4">
								<h3 className="mb-2 font-medium">Your Profile</h3>
								<div className="space-y-2">
									<p>
										<strong>Email:</strong> {session.user.email}
									</p>
									<p>
										<strong>Account Type:</strong>{" "}
										{session.user.isAnonymous ? "Guest" : "Registered"}
									</p>
									<p>
										<strong>Email Verified:</strong>{" "}
										{session.user.emailVerified ? "Yes" : "No"}
									</p>
								</div>
							</div>
						</div>
					) : (
						<div className="text-center">
							<p>Loading session...</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
