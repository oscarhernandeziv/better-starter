import type { SectionContent, SubSectionContent } from "@/src/types/sections";

// Main sections
export const sectionContent: SectionContent = {
	"00": { title: "HOME", description: "Introduction to Better Starter" },
	"01": { title: "STACK", description: "Technology Stack Overview" },
	"02": { title: "DOCS", description: "Documentation & Resources" },
	"03": { title: "EXAMPLES", description: "Sample Pages and Components" },
	"04": { title: "AUTH", description: "User Authentication Options" },
};

// Subsections for section 03 (Examples)
export const subSectionContent: SubSectionContent = {
	"03": {
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
	"04": {
		"4.1": {
			title: "SIGN IN",
			description: "Log in to your account",
		},
		"4.2": {
			title: "SIGN UP",
			description: "Create a new account",
		},
	},
};
