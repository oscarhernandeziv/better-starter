"use client";

import { Layout } from "@/app/_components/shared/layout";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { Construction } from "lucide-react";

export default function DataVisualizationPage() {
	return (
		<Layout>
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<div className="flex h-full flex-col p-6">
					<p className="mb-4 text-sm leading-relaxed">
						This example showcases beautiful data visualization using shadcn/ui
						chart components and Motion (formerly Framer Motion) for enhanced
						user experiences.
					</p>

					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Planned Features:</h3>
						<ul className="list-disc space-y-2 pl-5 text-sm">
							<li>Interactive data charts with shadcn/ui components</li>
							<li>Animated data transitions with Motion</li>
							<li>Real-time data visualization updates</li>
							<li>Customizable chart themes and styles</li>
							<li>Responsive data dashboards for all devices</li>
						</ul>
					</div>
				</div>

				<div className="flex h-full flex-col items-center justify-center border-l bg-muted/40 p-6">
					<Card className="w-full max-w-md py-3">
						<CardContent className="flex flex-col gap-0.5 px-4 py-0">
							<div className="flex items-center gap-1.5">
								<Construction className="h-4 w-4" />
								<CardTitle className="text-base">Under Construction</CardTitle>
							</div>
							<p className="text-muted-foreground text-xs">
								This example is currently under development and will be
								available soon.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	);
}
