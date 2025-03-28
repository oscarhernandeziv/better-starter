import { routes } from "@/src/config/routes";
import Link from "next/link";

export function ComponentList() {
	// Get the examples route which contains subRoutes
	const examplesRoute = routes.find((route) => route.id === "examples");
	const subRoutes = examplesRoute?.subRoutes || [];

	return (
		<div className="flex h-full flex-col border-border border-t p-6 md:border-t-0 md:border-l">
			<h3 className="mb-4 font-bold text-lg">Examples</h3>
			<p className="mb-4 text-sm">
				Explore our collection of ready-to-use components and applications that
				showcase the capabilities of our stack:
			</p>

			<div className="mb-6">
				<h4 className="mb-2 font-semibold">Available Examples</h4>
				<ul className="list-disc space-y-2 pl-5 text-sm">
					{subRoutes
						.filter((route) => route.id === "todo")
						.map((route) => (
							<li key={route.id}>
								<Link
									href={route.path}
									className="text-primary hover:underline"
								>
									{route.label} - Full Stack CRUD application
								</Link>
							</li>
						))}
				</ul>
			</div>

			<div>
				<h4 className="mb-2 font-semibold">Coming Soon</h4>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground text-sm">
					{subRoutes
						.filter((route) => route.id !== "todo")
						.map((route) => (
							<li key={route.id}>
								<span>{route.label}</span>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
