export function TodoInfo() {
	return (
		<div className="flex h-full flex-col p-6">
			<h2 className="mb-4 font-bold text-lg">Todo Application</h2>
			<p className="mb-4 text-sm leading-relaxed">
				This is a simple todo application that demonstrates the use of Next.js
				server actions, Drizzle ORM, and Turso SQLite database.
			</p>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold">Features:</h3>
				<ul className="list-disc space-y-2 pl-5 text-sm">
					<li>Create, read, update, and delete todo items</li>
					<li>Mark todos as complete/incomplete</li>
					<li>Server-side rendering with Next.js</li>
					<li>SQLite database with Turso</li>
					<li>Type-safe database operations with Drizzle ORM</li>
					<li>Form validation with Zod</li>
				</ul>
			</div>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold">Implementation Details:</h3>
				<ul className="list-disc space-y-2 pl-5 text-sm">
					<li>Uses a layered architecture with repositories and services</li>
					<li>Server actions for server-side data mutations</li>
					<li>Client-side UI with React hooks for state management</li>
					<li>
						Styled with Tailwind CSS using the shadcn/ui component library
					</li>
				</ul>
			</div>
		</div>
	);
}
