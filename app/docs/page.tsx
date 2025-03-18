"use client";
import { DocsContent } from "@/app/_components/pages/docs/content";
import { Resources } from "@/app/_components/pages/docs/resources";
import { Layout } from "@/app/_components/shared/layout";

export default function DocsPage() {
	return (
		<Layout defaultSection="02">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<DocsContent />
				<Resources />
			</div>
		</Layout>
	);
}
