import type { SectionContent, SubSectionContent } from "@/src/types/sections";

// Main sections
export const sectionContent: SectionContent = {
	home: { title: "HOME", description: "Introduction to Better Starter" },
	stack: { title: "STACK", description: "Technology Stack Overview" },
	docs: { title: "DOCS", description: "Documentation & Resources" },
	examples: { title: "EXAMPLES", description: "Sample Pages and Components" },
	signIn: { title: "SIGN IN", description: "User Authentication" },
	profile: { title: "PROFILE", description: "User Profile" },
};

// Subsections
export const subSectionContent: SubSectionContent = {
	examples: {
		todo: {
			title: "TODO LIST APPLICATION",
			description: "CRUD operations with Next.js server actions",
		},
		authentication: {
			title: "AUTHENTICATION",
			description: "User authentication flow example",
		},
		dataViz: {
			title: "DATA VISUALIZATION",
			description: "Charts and data display patterns",
		},
		forms: {
			title: "FORM VALIDATION",
			description: "Complex form handling with Zod validation",
		},
		noteTaking: {
			title: "NOTE TAKING APPLICATION",
			description: "Feature-rich note management system",
		},
	},
};
