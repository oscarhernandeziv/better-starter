"use client";

import { ProfileContent } from "@/app/_components/pages/profile/profile-content";
import { ProfileDetails } from "@/app/_components/pages/profile/profile-details";
import { Layout } from "@/app/_components/shared/layout";

export default function ProfilePage() {
	return (
		<Layout defaultSection="auth">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<ProfileContent />
				<ProfileDetails />
			</div>
		</Layout>
	);
}
