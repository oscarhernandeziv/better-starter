"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useSession } from "@/src/config/auth/auth-client";
import {
	type ProfileUpdateData,
	profileUpdateSchema,
} from "@/src/entities/models/auth";
import { useAuth } from "@/src/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ProfileDetails() {
	const { data: session } = useSession();
	const [isEditing, setIsEditing] = useState(false);
	const { updateProfile, signOut, isLoading } = useAuth();

	// Initialize the form with user data
	const form = useForm<ProfileUpdateData>({
		resolver: zodResolver(profileUpdateSchema),
		defaultValues: {
			name: session?.user?.name || "",
			image: session?.user?.image || "",
		},
	});

	// Update form values when session changes
	useEffect(() => {
		if (session && !form.getValues().name) {
			form.reset({
				name: session.user.name || "",
				image: session.user.image || "",
			});
		}
	}, [session, form]);

	// Handle profile update
	const handleUpdateProfile = async (data: ProfileUpdateData) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("image", data.image || "");

		updateProfile(formData);
		setIsEditing(false);
	};

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

			{session ? (
				<div className="max-w-md space-y-6">
					{isEditing ? (
						<form
							onSubmit={form.handleSubmit(handleUpdateProfile)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									{...form.register("name")}
									disabled={isLoading}
								/>
								{form.formState.errors.name && (
									<p className="text-destructive text-sm">
										{form.formState.errors.name.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="image">Profile Image URL</Label>
								<Input
									id="image"
									type="url"
									{...form.register("image")}
									disabled={isLoading}
									placeholder="https://example.com/image.jpg"
								/>
								{form.formState.errors.image && (
									<p className="text-destructive text-sm">
										{form.formState.errors.image.message}
									</p>
								)}
							</div>

							<div className="flex items-center gap-3">
								<Button type="submit" disabled={isLoading}>
									Save Changes
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsEditing(false)}
									disabled={isLoading}
								>
									Cancel
								</Button>
							</div>
						</form>
					) : (
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

							<Button
								onClick={() => {
									setIsEditing(true);
								}}
								variant="secondary"
							>
								Edit Profile
							</Button>
						</>
					)}
				</div>
			) : (
				<div className="text-center">
					<p>Loading session...</p>
				</div>
			)}
		</div>
	);
}
