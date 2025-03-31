"use client";

import { Button } from "@/app/_components/ui/button";
import type { AuthSession } from "@/src/entities/models/auth";

interface ProfileViewProps {
	session: AuthSession;
	onEdit: () => void;
}

export function ProfileView({ session, onEdit }: ProfileViewProps) {
	return (
		<>
			<div className="rounded-md bg-muted p-4">
				<div className="space-y-2">
					<p>
						<strong>Name:</strong> {session.user.name || "Not set"}
					</p>
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
					{session.user.image && (
						<p>
							<strong>Profile Image:</strong>{" "}
							<a
								href={session.user.image}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary text-sm underline"
							>
								View Image
							</a>
						</p>
					)}
				</div>
			</div>

			<Button onClick={onEdit} variant="secondary">
				Edit Profile
			</Button>
		</>
	);
}
