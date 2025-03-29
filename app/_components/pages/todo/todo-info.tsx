"use client";

export function TodoInfo() {
	return (
		<div className="flex h-full flex-col">
			<p className="mb-4 text-sm leading-relaxed">
				This example demonstrates how to build a simple TODO application with
				Next.js, TanStack Query, and server actions for data management.
			</p>

			<div className="mb-4">
				<h3 className="mb-2 font-semibold">Features:</h3>
				<ul className="list-disc space-y-2 pl-5 text-sm">
					<li>Create, read, update, and delete TODO items</li>
					<li>Optimistic UI updates using TanStack Query</li>
					<li>Data persistence with SQLite and Drizzle ORM</li>
					<li>Form validation with Zod</li>
					<li>Clean Architecture with separation of concerns</li>
				</ul>
			</div>

			<div className="mb-4">
				<h3 className="mb-2 font-semibold">Implementation Details:</h3>
				<ul className="list-disc space-y-2 pl-5 text-sm">
					<li>
						<span className="font-medium">Database Layer:</span> Uses Drizzle
						ORM with SQLite
					</li>
					<li>
						<span className="font-medium">API Layer:</span> Server actions with
						validation
					</li>
					<li>
						<span className="font-medium">Client State:</span> TanStack Query
						for data fetching and caching
					</li>
					<li>
						<span className="font-medium">UI Components:</span> Functional React
						components with shadcn/ui
					</li>
				</ul>
			</div>
		</div>
	);
}
