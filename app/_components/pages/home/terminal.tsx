import { Button } from "@/app/_components/ui/button";
import { Minus } from "lucide-react";

const GETTING_STARTED_STEPS = [
	"Install Bun for faster dependency management",
	"Clone the Next Stack repository",
	"Select your preferred UI components",
	"Configure Better-Auth for authentication",
	"Choose your database and ORM",
	"Set up Biome for linting and formatting",
	"Configure Tailwind v4 themes",
	"Set up your deployment pipeline",
	"Enable edge functions and middleware",
	"Start building with React 19 features",
	"Enjoy 2x faster build times and DX",
];

export function Terminal() {
	return (
		<div className="flex h-full flex-col border-border border-t md:border-t-0 md:border-l">
			<div className="flex items-center justify-between border-border border-b bg-secondary px-3 text-sm">
				<span>Terminal</span>
				<Button variant="ghost" size="icon">
					<Minus size={14} />
				</Button>
			</div>

			<div className="flex-1 space-y-1 p-4 font-mono text-muted-foreground text-sm">
				<div className="mb-2 text-muted-foreground">
					$ cat GETTING_STARTED.md
				</div>

				<table className="w-full border-collapse text-left">
					<tbody>
						{GETTING_STARTED_STEPS.map((step, i) => (
							<tr key={step} className="border-border border-b">
								<td className="py-1 pr-2 text-muted-foreground">{i + 1}.</td>
								<td className="py-1">{step}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
