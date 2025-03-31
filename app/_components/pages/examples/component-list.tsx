export function ComponentList() {
	return (
		<div className="flex h-full flex-col border-border border-t p-6 md:border-t-0 md:border-l">
			<h3 className="mb-4 font-bold text-lg">Examples</h3>
			<p className="mb-4 text-sm">
				Explore our collection of ready-to-use components and applications that
				showcase the capabilities of our stack:
			</p>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<ExampleCard
					title="Authentication"
					description="User management with better-auth for secure, modern auth flows."
					href="/examples/profile"
				/>
				<ExampleCard
					title="Todos"
					description="Data fetching and async state management with TanStack Query."
					href="/examples/todo"
				/>
				<ExampleCard
					title="Leaderboard"
					description="Global checkbox clicker leaderboard using Turso's edge-friendly database."
					href="/examples/leaderboard"
				/>
				<ExampleCard
					title="Waitlist"
					description="Type-safe and validated form handling with TanStack Form."
					href="/examples/waitlist"
				/>
				<ExampleCard
					title="Products"
					description="Lightweight table filtering and pagination with Tanstack Table."
					href="/examples/product"
				/>
				<ExampleCard
					title="Data Viz"
					description="Beautiful charts with shadcn/ui components and Motion animations."
					href="/examples/visualization"
				/>
			</div>
		</div>
	);
}

interface ExampleCardProps {
	title: string;
	description: string;
	href: string;
}

function ExampleCard({ title, description, href }: ExampleCardProps) {
	return (
		<a
			href={href}
			className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary hover:shadow-md"
		>
			<h4 className="mb-1 font-semibold text-lg group-hover:text-primary">
				{title}
			</h4>
			<p className="text-muted-foreground">{description}</p>
		</a>
	);
}
