import type { SectionContent, SubSectionContent } from "@/src/types/sections";

// Main sections
export const sectionContent: SectionContent = {
	"0.0": { title: "HOME", description: "Introduction to Better Starter" },
	"1.0": { title: "STACK", description: "Technology Stack Overview" },
	"2.0": { title: "DOCS", description: "Documentation & Resources" },
	"3.0": { title: "EXAMPLES", description: "Sample Pages and Components" },
	"4.0": { title: "SIGN IN", description: "User Authentication" },
};

// Subsections
export const subSectionContent: SubSectionContent = {
	"3.0": {
		"3.1": {
			title: "TODO LIST APPLICATION",
			description: "CRUD operations with Next.js server actions",
		},
		"3.2": {
			title: "AUTHENTICATION",
			description: "User authentication flow example",
		},
		"3.3": {
			title: "DATA VISUALIZATION",
			description: "Charts and data display patterns",
		},
		"3.4": {
			title: "FORM VALIDATION",
			description: "Complex form handling with Zod validation",
		},
		"3.5": {
			title: "INFINITE SCROLL",
			description: "Optimized data loading patterns",
		},
	},
	"4.0": {
		"4.1": {
			title: "SIGN IN",
			description: "Authenticate with your account",
		},
		"4.2": {
			title: "PROFILE",
			description: "Manage your user profile",
		},
	},
};
