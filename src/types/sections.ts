// Define section types
export type SectionName =
	| "home"
	| "stack"
	| "docs"
	| "examples"
	| "signIn"
	| "profile";

// Define subsection types
export type SubSectionName =
	| "todo"
	| "authentication"
	| "dataViz"
	| "forms"
	| "noteTaking";

// Define section content type
export type SectionContent = Record<
	SectionName,
	{
		title: string;
		description: string;
	}
>;

// Define subsection content type
export type SubSectionContent = Partial<
	Record<
		SectionName,
		Partial<
			Record<
				SubSectionName,
				{
					title: string;
					description: string;
				}
			>
		>
	>
>;
