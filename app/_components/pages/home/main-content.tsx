import { StackDiagram } from "./stack-diagram";

export function MainContent() {
	return (
		<div className="flex h-full flex-col border-border border-r p-6">
			<div className="mb-8">
				<div className="space-y-4 text-sm leading-relaxed">
					<p>
						Jumpstart your project with Next.js 15, React 19, and Tailwind v4,
						all pre-configured out of the box with shadcn/ui components for
						beautiful, accessible interfaces.
					</p>

					<p>
						Better-Auth handles authentication and user management seamlessly,
						with the power of Turso and Drizzle ORM for a blazing fast,
						type-safe database.
					</p>

					<p>
						Start building at the speed of thought with complete configuration
						for AI-powered development and enhanced productivity.
					</p>
				</div>
			</div>

			<StackDiagram />
		</div>
	);
}
