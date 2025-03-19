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

				<div className="flex items-center justify-between border-border border-b p-4">
					<div className="flex items-center gap-4">
						<div className="inline-flex size-9 items-center justify-center rounded-md bg-foreground text-background text-lg">
							{activeSection}
						</div>
						<div>
							<p className="font-bold text-foreground text-lg">
								{sectionContent[activeSection].description}
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
