"use client";

import { ThemeToggle } from "@/app/_components/theme/theme-toggle";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/app/_components/ui/navigation-menu";
import { cn } from "@/app/_components/utils";
import { routes } from "@/src/config/routes";
import type { SectionId } from "@/src/types/sections";
import { Menu, SquareArrowOutUpRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
	activeSection: SectionId;
	setActiveSection: (section: SectionId) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	// Handle section change
	const handleSectionChange = (section: SectionId) => {
		setActiveSection(section);
		setMobileMenuOpen(false);
	};

	return (
		<header className="relative border-border border-b p-4">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="mb-4 text-sm md:mb-0">
					<div className="font-bold text-lg italic">Better Starter</div>
					<div className="text-muted-foreground text-xs">
						BNJS-1000 • JAN 2025
					</div>
				</Link>

				{/* Mobile Menu Toggle */}
				<Button
					size="icon"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
				>
					{mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
				</Button>

				{/* Desktop Navigation */}
				<div className="hidden md:flex md:items-center md:gap-2">
					<NavigationMenu className="relative">
						<NavigationMenuList className="flex gap-2">
							{routes.map((route) => (
								<NavigationMenuItem key={route.id}>
									{route.isExternal ? (
										<a
											href={route.path}
											target="_blank"
											rel="noopener noreferrer"
											className={cn(
												buttonVariants(),
												"h-9",
												activeSection === route.id &&
													"bg-foreground text-background",
											)}
											onClick={() => handleSectionChange(route.id)}
										>
											{route.label}
											<SquareArrowOutUpRight className="ml-1" size={12} />
										</a>
									) : (
										<Link
											href={route.path}
											className={cn(
												buttonVariants(),
												"h-9",
												activeSection === route.id &&
													"bg-foreground text-background",
											)}
											onClick={() => handleSectionChange(route.id)}
										>
											{route.label}
										</Link>
									)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
					<ThemeToggle />
				</div>
			</div>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<nav className="absolute top-full right-0 left-0 z-50 flex flex-col gap-2 border-border border-t bg-background p-4 text-xs">
					{routes.map((route) => (
						<div key={route.id} className="w-full">
							{route.isExternal ? (
								<a
									href={route.path}
									target="_blank"
									rel="noopener noreferrer"
									className="block w-full"
								>
									<Button
										className={cn(
											"w-full",
											activeSection === route.id &&
												"bg-foreground text-background",
										)}
										onClick={() => handleSectionChange(route.id)}
									>
										{route.label}
										<SquareArrowOutUpRight className="ml-1" size={12} />
									</Button>
								</a>
							) : (
								<Link href={route.path} className="block w-full">
									<Button
										className={cn(
											"w-full",
											activeSection === route.id &&
												"bg-foreground text-background",
										)}
										onClick={() => handleSectionChange(route.id)}
									>
										{route.label}
									</Button>
								</Link>
							)}
						</div>
					))}
					<div className="mt-2 w-full">
						<ThemeToggle />
					</div>
				</nav>
			)}
		</header>
	);
}
