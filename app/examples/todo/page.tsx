"use client";

import { Layout } from "@/app/_components/shared/layout";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import { useSession } from "@/src/lib/auth-client";
import { Construction } from "lucide-react";
import { redirect } from "next/navigation";

export default function TodoPage() {
	const { data: session } = useSession();

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<Layout defaultSection="examples" defaultSubSection="todo">
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<div className="flex h-full flex-col p-6">
					<p className="mb-4 text-sm leading-relaxed">
						This example demonstrates how to build a simple TODO application
						with Next.js, including state management, data persistence, and UI
						components.
					</p>

					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Planned Features:</h3>
						<ul className="list-disc space-y-2 pl-5 text-sm">
							<li>Create, read, update, and delete TODO items</li>
							<li>Filter and sort functionality</li>
							<li>Persisting data with server actions</li>
							<li>Optimistic UI updates</li>
							<li>Drag and drop reordering</li>
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
