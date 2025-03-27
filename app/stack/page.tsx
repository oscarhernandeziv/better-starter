"use client";
import { StackContent } from "@/app/_components/pages/stack/content";
import { Layout } from "@/app/_components/shared/layout";

export default function StackPage() {
	return (
		<Layout defaultSection="1.0">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<StackContent />
				<div className="flex h-full flex-col border-border border-t p-6 md:border-t-0 md:border-l">
					<h3 className="mb-4 font-bold text-lg">Performance</h3>
					<p className="mb-4 text-sm leading-relaxed">
						Better Starter is optimized for speed and developer experience, with
						advanced features for maximum performance:
					</p>
					<ul className="list-disc space-y-2 pl-5 text-sm">
						<li>React Server Components for improved loading</li>
						<li>Automatic component-level code splitting</li>
						<li>Optimized asset loading and image optimization</li>
						<li>Edge-compatible deployment options</li>
						<li>Partial prerendering for faster initial loads</li>
						<li>Streaming server rendering for improved UX</li>
						<li>Built-in caching strategies</li>
						<li>Middleware for route-level optimizations</li>
					</ul>
				</div>
			</div>
		</Layout>
	);
}
