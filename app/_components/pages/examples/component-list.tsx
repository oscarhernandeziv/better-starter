export function ComponentList() {
	return (
		<div className="flex flex-col h-full p-6 border-border border-t md:border-t-0 md:border-l">
			<h3 className="mb-4 font-bold text-lg">Component Examples</h3>
			<p className="mb-4 text-sm">
				Ready-to-use components and patterns to accelerate your development:
			</p>
			<ul className="list-disc space-y-2 pl-5 text-sm">
				<li>Form Validation Patterns</li>
				<li>Responsive Dashboard Layouts</li>
				<li>Authentication Flows</li>
				<li>API Integration Patterns</li>
				<li>Data Tables and Filters</li>
				<li>Modal and Dialog Systems</li>
				<li>Theme Switching</li>
				<li>Animated Transitions</li>
			</ul>
		</div>
	);
}
