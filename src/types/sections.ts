// Define section types
export type SectionId = "00" | "01" | "02" | "03" | "04";

// Define subsection types
export type SubSectionId =
	| "3.1"
	| "3.2"
	| "3.3"
	| "3.4"
	| "3.5"
	| "4.1"
	| "4.2";

// Define section content type
export type SectionContent = Record<
	SectionId,
	{
		title: string;
		description: string;
	}
>;

// Define subsection content type
export type SubSectionContent = Partial<
	Record<
		SectionId,
		Partial<
			Record<
				SubSectionId,
				{
					title: string;
					description: string;
				}
			>
		>
	>
>;
