"use client";
import { StackContent } from "@/app/_components/pages/stack/content";
import { Layout } from "@/app/_components/shared/layout";

export default function StackPage() {
	return (
		<Layout defaultSection="01">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<StackContent />
				<div className="h-full p-6">
					<h3 className="mb-4 font-bold text-lg">Performance</h3>
					<p className="mb-4 text-muted-foreground text-sm">
						Better Starter is optimized for speed and developer experience, with
						features like:
					</p>
					<ul className="list-disc space-y-2 pl-5 text-sm">
						<li>Server components for improved loading</li>
						<li>Component-level code splitting</li>
						<li>Optimized asset loading</li>
						<li>Edge-compatible deployment options</li>
					</ul>
				</div>
			</div>
		</Layout>
	);
}
