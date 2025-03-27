"use client";

import { ComponentList } from "@/app/_components/pages/examples/component-list";
import { ExamplesContent } from "@/app/_components/pages/examples/content";
import { Layout } from "@/app/_components/shared/layout";
import { useSession } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ExamplesPage() {
	const { data: session } = useSession();
	const router = useRouter();

	if (!session) {
		router.push("/sign-in");
	}

	return (
		<Layout defaultSection="3.0">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<ExamplesContent />
				<ComponentList />
			</div>
		</Layout>
	);
}
