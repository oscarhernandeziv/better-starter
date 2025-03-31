"use client";

import { Button } from "@/app/_components/ui/button";
import type { AuthSession } from "@/src/entities/models/auth";
import { useAuth } from "@/src/hooks/use-auth";
import { useProfileForm } from "@/src/hooks/use-profile-form";
import { useSession } from "@/src/lib/auth-client";
import { useState } from "react";
import { ProfileForm } from "./profile-form";
import { ProfileView } from "./profile-view";

export function ProfileDetails() {
	const { data: session } = useSession();
	const [isEditing, setIsEditing] = useState(false);
	const { updateProfile, signOut, isLoading } = useAuth();

	// Cast session to AuthSession since we know the structure matches
	const authSession = session as AuthSession | null;

	const { form, handleUpdateProfile } = useProfileForm({
		session: authSession,
		onSuccess: () => setIsEditing(false),
		updateProfile,
	});

	if (!authSession) {
		return (
			<div className="text-center">
				<p>Loading session...</p>
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col border-border border-t bg-muted/40 p-6 md:border-t-0 md:border-l">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="font-bold text-lg">Account Information</h3>
				<Button
					variant="outline"
					onClick={() => signOut()}
					disabled={isLoading}
				>
					Sign Out
				</Button>
			</div>

			<div className="max-w-md space-y-6">
				{isEditing ? (
					<ProfileForm
						form={form}
						isLoading={isLoading}
						onSubmit={handleUpdateProfile}
						onCancel={() => setIsEditing(false)}
					/>
				) : (
					<ProfileView
						session={authSession}
						onEdit={() => setIsEditing(true)}
					/>
				)}
			</div>
		</div>
	);
}
