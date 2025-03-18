import type { SectionId } from "@/src/types/sections";

export type Route = {
	id: SectionId;
	label: string;
	path: string;
	isExternal?: boolean;
};

export const routes: Route[] = [
	{ id: "00", label: "00. Index", path: "/" },
	{ id: "01", label: "01. Stack", path: "/stack" },
	{ id: "02", label: "02. Docs", path: "/docs" },
	{ id: "03", label: "03. Examples", path: "/examples" },
	{ id: "04", label: "04. Todo", path: "/todo" },
	{
		id: "05",
		label: "05. Source",
		path: "https://github.com/oscarhernandeziv/better-starter",
		isExternal: true,
	},
	{ id: "06", label: "06. SIGN IN", path: "/auth" },
];

export const getSectionFromPath = (path: string): SectionId => {
	const route = routes.find((r) => r.path === path);
	return route?.id || "00";
};
