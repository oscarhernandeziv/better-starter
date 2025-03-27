"use client";

import { Footer } from "@/app/_components/shared/navigation/footer";
import { Header } from "@/app/_components/shared/navigation/header";
import { getSectionFromPath, getSubSectionFromPath } from "@/src/config/routes";
import { sectionContent, subSectionContent } from "@/src/config/sections";
import type { SectionName, SubSectionName } from "@/src/types/sections";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

interface LayoutProps {
	children: React.ReactNode;
	defaultSection?: SectionName;
	defaultSubSection?: SubSectionName;
}

export function Layout({
	children,
	defaultSection = "home",
	defaultSubSection,
}: LayoutProps) {
	const [activeSection, setActiveSection] =
		useState<SectionName>(defaultSection);
	const [activeSubSection, setActiveSubSection] = useState<
		SubSectionName | undefined
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

	// Get the content title and description based on section and subsection
	const getContentTitle = () => {
		if (
			activeSubSection &&
			subSectionContent[activeSection]?.[activeSubSection]
		) {
			return subSectionContent[activeSection][activeSubSection].title;
		}
		return sectionContent[activeSection]?.title || "";
	};

	const getContentDescription = () => {
		if (
			activeSubSection &&
			subSectionContent[activeSection]?.[activeSubSection]
		) {
			return subSectionContent[activeSection][activeSubSection].description;
		}
		return sectionContent[activeSection]?.description || "";
	};

	return (
		<div className="flex min-h-screen flex-col bg-background p-4 font-mono text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden border border-border">
				<Header
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>

				<div className="flex items-center justify-between border-border border-b p-4">
					<div className="flex items-center gap-4">
						<div>
							<p className="font-bold text-foreground text-lg">
								{getContentTitle()}
							</p>
							<p className="text-muted-foreground text-sm">
								{getContentDescription()}
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
