import {
	type AuthSession,
	type ProfileUpdateData,
	profileUpdateSchema,
} from "@/src/entities/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UseProfileFormProps {
	session: AuthSession | null;
	onSuccess?: () => void;
	updateProfile: (formData: FormData) => void;
}

export function useProfileForm({
	session,
	onSuccess,
	updateProfile,
}: UseProfileFormProps) {
	const form = useForm<ProfileUpdateData>({
		resolver: zodResolver(profileUpdateSchema),
		defaultValues: {
			name: session?.user?.name || "",
			image: session?.user?.image || "",
		},
	});

	useEffect(() => {
		if (session && !form.getValues().name) {
			form.reset({
				name: session.user.name || "",
				image: session.user.image || "",
			});
		}
	}, [session, form]);

	const handleUpdateProfile = async (data: ProfileUpdateData) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("image", data.image || "");

		updateProfile(formData);
		onSuccess?.();
	};

	return {
		form,
		handleUpdateProfile,
	};
}
