"use client";

import { ThemeToggle } from "@/app/_components/theme/theme-toggle";
import { Button } from "@/app/_components/ui/button";
import { routes } from "@/src/config/routes";
import type { SectionId } from "@/src/types/sections";
import { Menu, SquareArrowOutUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
	activeSection: SectionId;
	setActiveSection: (section: SectionId) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				setMobileMenuOpen(false);
			}
		};

		if (mobileMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [mobileMenuOpen]);

	return (
		<header
			ref={headerRef}
			className="relative flex flex-col items-start justify-between border-border border-b p-4 md:flex-row md:items-center"
		>
			<div className="flex w-full justify-between md:w-auto">
				<Link href="/" className="mb-4 text-sm md:mb-0">
					<div className="font-bold text-lg italic">Better Starter</div>
					<div className="text-muted-foreground text-xs">
						BNJS-1000 • JAN 2025
					</div>
				</Link>

				<Button
					size="icon"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
				>
					{mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
				</Button>
			</div>

			<nav
				className={`
				${mobileMenuOpen ? "flex" : "hidden"} w-full flex-col gap-2 text-xs md:flex md:w-auto md:flex-row md:flex-wrap${mobileMenuOpen ? "absolute top-full right-0 left-0 z-50 border-border border-t bg-background p-4" : ""}
			`}
			>
				{routes.map((route) => {
					if (route.isExternal) {
						return (
							<a
								key={route.id}
								href={route.path}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									className={`w-full md:w-auto ${
										activeSection === route.id
											? "border-muted-foreground bg-muted"
											: ""
									}`}
									onClick={() => {
										setActiveSection(route.id);
										setMobileMenuOpen(false);
									}}
								>
									{route.label}
									<SquareArrowOutUpRight
										className="ml-1 inline-block"
										size={12}
									/>
								</Button>
							</a>
						);
					}

					return (
						<Link key={route.id} href={route.path}>
							<Button
								className={`w-full md:w-auto ${
									activeSection === route.id
										? "border-muted-foreground bg-muted"
										: ""
								}`}
								onClick={() => {
									setActiveSection(route.id);
									setMobileMenuOpen(false);
								}}
							>
								{route.label}
							</Button>
						</Link>
					);
				})}
				<div
					className={`${mobileMenuOpen ? "mt-2 w-full" : ""} md:mt-0 md:w-auto`}
				>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
