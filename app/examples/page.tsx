"use client";
import { ComponentList } from "@/app/_components/pages/examples/component-list";
import { ExamplesContent } from "@/app/_components/pages/examples/content";
import { Layout } from "@/app/_components/shared/layout";

export default function ExamplesPage() {
	return (
		<Layout defaultSection="03">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<ExamplesContent />
				<ComponentList />
			</div>
		</Layout>
	);
}
