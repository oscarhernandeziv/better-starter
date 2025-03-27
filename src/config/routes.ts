import type { SectionId, SubSectionId } from "@/src/types/sections";

export type Route = {
	id: SectionId;
	label: string;
	path: string;
	isExternal?: boolean;
	subRoutes?: SubRoute[];
};

export type SubRoute = {
	id: SubSectionId;
	label: string;
	path: string;
	isExternal?: boolean;
};

export const routes: Route[] = [
	{ id: "00", label: "00. Index", path: "/" },
	{ id: "01", label: "01. Stack", path: "/stack" },
	{ id: "02", label: "02. Docs", path: "/docs" },
	{
		id: "03",
		label: "03. Examples",
		path: "/examples",
		subRoutes: [
			{ id: "3.1", label: "3.1 Todo List", path: "/examples/todo" },
			{ id: "3.2", label: "3.2 Authentication", path: "/examples/auth" },
			{
				id: "3.3",
				label: "3.3 Data Visualization",
				path: "/examples/data-viz",
			},
			{ id: "3.4", label: "3.4 Form Validation", path: "/examples/forms" },
			{
				id: "3.5",
				label: "3.5 Infinite Scroll",
				path: "/examples/infinite-scroll",
			},
		],
	},
	{
		id: "04",
		label: "04. Sign In",
		path: "/sign-in",
	},
];

export const getSectionFromPath = (path: string): SectionId => {
	// Check main routes first
	const route = routes.find((r) => r.path === path);
	if (route) return route.id;

	// Check subroutes
	for (const mainRoute of routes) {
		if (mainRoute.subRoutes) {
			const subRoute = mainRoute.subRoutes.find((sr) => sr.path === path);
			if (subRoute) return mainRoute.id;
		}
	}

	return "00";
};

export const getSubSectionFromPath = (
	path: string,
): SubSectionId | undefined => {
	// Check all subroutes
	for (const mainRoute of routes) {
		if (mainRoute.subRoutes) {
			const subRoute = mainRoute.subRoutes.find((sr) => sr.path === path);
			if (subRoute) return subRoute.id;
		}
	}

	return undefined;
};
