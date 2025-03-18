interface DiagramNodeProps {
	title: string;
	subtitle: string;
}

function DiagramNode({ title, subtitle }: DiagramNodeProps) {
	return (
		<div className="border border-border p-2 text-center">
			{title}
			<br />
			{subtitle}
		</div>
	);
}

function DiagramArrow({
	direction = "right",
}: { direction?: "right" | "down" }) {
	if (direction === "down") {
		return (
			<div className="flex flex-col items-center justify-center text-muted-foreground">
				<div>│</div>
				<div>▼</div>
			</div>
		);
	}
	return (
		<div className="flex items-center justify-center text-muted-foreground">
			───────►
		</div>
	);
}

export function StackDiagram() {
	return (
		<div className="border border-border p-4">
			<div className="mb-4 text-center text-xs">THE BETTER STARTER FLOW</div>
			<div className="grid grid-cols-3 gap-4 text-xs">
				<DiagramNode title="NEXT.JS 15" subtitle="APP ROUTER" />
				<DiagramArrow />
				<DiagramNode title="REACT 19" subtitle="COMPONENTS" />

				<DiagramArrow direction="down" />
				<DiagramArrow direction="down" />
				<DiagramArrow direction="down" />

				<DiagramNode title="BUN" subtitle="RUNTIME" />
				<DiagramArrow />
				<DiagramNode title="BIOME" subtitle="TOOLCHAIN" />
			</div>
		</div>
	);
}
