export function StackContent() {
	return (
		<div className="h-full border-border border-r p-6">
			<div className="mb-8">
				<h2 className="font-bold text-2xl">Technology Stack</h2>
				<p className="text-muted-foreground text-sm">
					Better Starter is built with a modern technology stack to ensure
					robust performance and maintainability.
				</p>
			</div>

			<div className="space-y-6">
				<div>
					<h3 className="mb-2 font-bold text-lg">Frontend</h3>
					<ul className="list-disc space-y-1 pl-5 text-sm">
						<li>Next.js 14 with App Router</li>
						<li>TypeScript for type safety</li>
						<li>Tailwind CSS for styling</li>
						<li>Shadcn UI components</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-2 font-bold text-lg">Development</h3>
					<ul className="list-disc space-y-1 pl-5 text-sm">
						<li>Biome for linting and formatting</li>
						<li>Turbopack for fast builds</li>
						<li>Next.js APIs for backend functionality</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
