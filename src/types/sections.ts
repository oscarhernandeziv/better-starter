// Define section types
export type SectionId = "00" | "01" | "02" | "03" | "04" | "05" | "06";

// Define section content type
export type SectionContent = Record<
	SectionId,
	{
		title: string;
		description: string;
	}
>;
