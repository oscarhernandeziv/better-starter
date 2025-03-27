"use client";

import { Footer } from "@/app/_components/shared/navigation/footer";
import { Header } from "@/app/_components/shared/navigation/header";
import { getSectionFromPath, getSubSectionFromPath } from "@/src/config/routes";
import { sectionContent, subSectionContent } from "@/src/config/sections";
import type { SectionId, SubSectionId } from "@/src/types/sections";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

interface LayoutProps {
	children: React.ReactNode;
	defaultSection?: SectionId;
	defaultSubSection?: SubSectionId;
}

export function Layout({
	children,
	defaultSection = "0.0",
	defaultSubSection,
}: LayoutProps) {
	const [activeSection, setActiveSection] = useState<SectionId>(defaultSection);
	const [activeSubSection, setActiveSubSection] = useState<
		SubSectionId | undefined
	>(defaultSubSection);
	const pathname = usePathname();

	// Update active section based on current path
	useEffect(() => {
		const section = getSectionFromPath(pathname);
		if (section) {
			setActiveSection(section);
		}

		const subSection = getSubSectionFromPath(pathname);
		setActiveSubSection(subSection);
	}, [pathname]);

	return (
		<div className="flex min-h-screen flex-col bg-background p-4 font-mono text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden border border-border">
				<Header
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>

				<div className="flex items-center justify-between border-border border-b p-4">
					<div className="flex items-center gap-4">
						<div className="inline-flex min-w-11 items-center justify-center rounded-md bg-foreground px-2 py-1.5 text-background text-lg">
							{activeSubSection || activeSection}
						</div>
						<div>
							<p className="font-bold text-foreground text-lg">
								{activeSubSection &&
								subSectionContent[activeSection]?.[activeSubSection]
									? subSectionContent[activeSection][activeSubSection].title
									: sectionContent[activeSection]?.title || "Unknown Section"}
							</p>
							<p className="text-muted-foreground text-sm">
								{activeSubSection &&
								subSectionContent[activeSection]?.[activeSubSection]
									? subSectionContent[activeSection][activeSubSection]
											.description
									: sectionContent[activeSection]?.description || ""}
							</p>
						</div>
					</div>
				</div>

				<div className="grid flex-1 grid-rows-1">{children}</div>

				<Footer />
			</div>
		</div>
	);
}
