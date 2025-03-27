"use client";

import { MainContent } from "@/app/_components/pages/home/main-content";
import { Terminal } from "@/app/_components/pages/home/terminal";
import { Layout } from "@/app/_components/shared/layout";

export default function HomePage() {
	return (
		<Layout defaultSection="home">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<MainContent />
				<Terminal />
			</div>
		</Layout>
	);
}
