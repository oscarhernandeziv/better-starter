"use client";

import { Footer } from "@/app/_components/shared/navigation/footer";
import { Header } from "@/app/_components/shared/navigation/header";
import { getSectionFromPath } from "@/src/config/routes";
import { sectionContent } from "@/src/config/sections";
import type { SectionId } from "@/src/types/sections";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

interface LayoutProps {
	children: React.ReactNode;
	defaultSection?: SectionId;
}

export function Layout({ children, defaultSection = "00" }: LayoutProps) {
	const [activeSection, setActiveSection] = useState<SectionId>(defaultSection);
	const pathname = usePathname();

	// Update active section based on current path
	useEffect(() => {
		const section = getSectionFromPath(pathname);
		if (section) {
			setActiveSection(section);
		}
	}, [pathname]);

	return (
		<div className="flex min-h-screen flex-col bg-background p-4 font-mono text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden border border-border">
				<Header
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>

				<div className="flex items-center border-border border-b p-4">
					<div className="inline-block border border-border bg-secondary px-2 py-1 text-sm">
						<span className="text-muted-foreground">{activeSection}.</span>{" "}
						{sectionContent[activeSection].title}
					</div>
					<div className="ml-4 text-sm">
						{sectionContent[activeSection].description}
					</div>
				</div>

				<div className="flex-1">{children}</div>

				<Footer />
			</div>
		</div>
	);
}
