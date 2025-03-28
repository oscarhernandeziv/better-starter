import type { SectionName, SubSectionName } from "@/src/types/sections";

export type Route = {
	id: SectionName;
	label: string;
	path: string;
	isExternal?: boolean;
	subRoutes?: SubRoute[];
	requiresAuth?: boolean;
};

export type SubRoute = {
	id: SubSectionName;
	label: string;
	path: string;
	isExternal?: boolean;
	requiresAuth?: boolean;
};

export const routes: Route[] = [
	{ id: "home", label: "00. INDEX", path: "/" },
	{ id: "stack", label: "01. STACK", path: "/stack" },
	{ id: "docs", label: "02. DOCS", path: "/docs" },
	{
		id: "examples",
		label: "03. EXAMPLES",
		path: "/examples",
		subRoutes: [
			{
				id: "todo",
				label: "TODO LIST",
				path: "/examples/todo",
			},
			{
				id: "authentication",
				label: "AUTH",
				path: "/examples/auth",
			},
			{
				id: "dataViz",
				label: "DATA VIZ",
				path: "/examples/data-viz",
			},
			{
				id: "forms",
				label: "FORM VALIDATION",
				path: "/examples/forms",
			},
			{
				id: "noteTaking",
				label: "NOTE TAKING",
				path: "/examples/note-taking",
			},
		],
	},
	{
		id: "signIn",
		label: "04. SIGN IN",
		path: "/sign-in",
		requiresAuth: false,
	},
	{
		id: "profile",
		label: "04. PROFILE",
		path: "/profile",
		requiresAuth: true,
	},
];

export const getSectionFromPath = (path: string): SectionName => {
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

	return "home";
};

export const getSubSectionFromPath = (
	path: string,
): SubSectionName | undefined => {
	// Check all subroutes
	for (const mainRoute of routes) {
		if (mainRoute.subRoutes) {
			const subRoute = mainRoute.subRoutes.find((sr) => sr.path === path);
			if (subRoute) return subRoute.id;
		}
	}

	return undefined;
};
