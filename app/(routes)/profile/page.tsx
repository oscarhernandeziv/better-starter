import { ProfileContent } from "@/app/_components/pages/profile/profile-content";
import { ProfileDetails } from "@/app/_components/pages/profile/profile-details";
import { Layout } from "@/app/_components/shared/layout";
import { protectRoute } from "@/src/lib/route-protection";

export default async function ProfilePage() {
	// Server-side protection - redirects to sign-in if not authenticated
	await protectRoute({ redirectTo: "/sign-in" });

	return (
		<Layout>
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<ProfileContent />
				<ProfileDetails />
			</div>
		</Layout>
	);
}
