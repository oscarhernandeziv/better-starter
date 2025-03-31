"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import type { ProfileUpdateData } from "@/src/entities/models/auth";
import type { UseFormReturn } from "react-hook-form";

interface ProfileFormProps {
	form: UseFormReturn<ProfileUpdateData>;
	isLoading: boolean;
	onSubmit: (data: ProfileUpdateData) => Promise<void>;
	onCancel: () => void;
}

export function ProfileForm({
	form,
	isLoading,
	onSubmit,
	onCancel,
}: ProfileFormProps) {
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...form.register("name")} disabled={isLoading} />
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
					onClick={onCancel}
					disabled={isLoading}
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}
