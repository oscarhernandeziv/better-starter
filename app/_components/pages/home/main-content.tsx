import { StackDiagram } from "./stack-diagram";

export function MainContent() {
	return (
		<div className="h-full border-border border-r p-6">
			<div className="mb-8">
				<h1 className="mb-4 font-bold text-2xl">
					NEXT.JS STARTER FOR THE FUTURE
				</h1>

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
						Start building at the speed of thought with complete .cursor/rules/
						and .instructions/ directories for AI-powered development.
					</p>
				</div>
			</div>

			<StackDiagram />
		</div>
	);
}
