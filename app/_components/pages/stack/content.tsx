export function StackContent() {
	return (
		<div className="flex h-full flex-col border-border p-6">
			<div className="mb-8">
				<p className="text-sm leading-relaxed">
					Better Starter is built with a modern technology stack designed for
					performance, developer experience, and maintainability. Each component
					has been carefully selected to provide the best foundation for your
					projects.
				</p>
			</div>

			<div className="space-y-6">
				<div>
					<h3 className="mb-2 font-bold text-lg">Frontend</h3>
					<ul className="list-disc space-y-1 pl-5 text-sm">
						<li>Next.js 15 with App Router</li>
						<li>React 19 with improved Server Components</li>
						<li>TypeScript 5.0+ for type safety</li>
						<li>Tailwind CSS v4.0 for styling</li>
						<li>Shadcn UI components</li>
					</ul>
				</div>

				<div>
					<h3 className="mb-2 font-bold text-lg">Development</h3>
					<ul className="list-disc space-y-1 pl-5 text-sm">
						<li>Bun for faster dependency management</li>
						<li>Biome for linting and formatting</li>
						<li>Turbopack for lightning-fast builds</li>
						<li>Server actions for backend functionality</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
