"use client";

import { ThemeToggle } from "@/app/_components/theme/theme-toggle";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/app/_components/ui/navigation-menu";
import { cn } from "@/app/_components/utils";
import { routes } from "@/src/config/routes";
import type { SubRoute } from "@/src/config/routes";
import { useSession } from "@/src/lib/auth-client";
import type { SectionId } from "@/src/types/sections";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
	activeSection: SectionId;
	setActiveSection: (section: SectionId) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [expandedSection, setExpandedSection] = useState<SectionId | null>(
		null,
	);
	const { data: session } = useSession();
	const isAuthenticated = !!session;

	// Handle section change
	const handleSectionChange = (section: SectionId) => {
		setActiveSection(section);
		setMobileMenuOpen(false);
	};

	// Toggle expanded section for mobile
	const toggleExpanded = (section: SectionId) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	// Function to determine if a route should be visible
	const shouldShowRoute = (route: (typeof routes)[0]) => {
		return true;
	};

	// Function to determine if a subroute should be visible
	const shouldShowSubRoute = (subRoute: SubRoute) => {
		// Show Sign In only when not authenticated
		if (subRoute.id === "4.1") {
			return !isAuthenticated;
		}
		// Show Profile only when authenticated
		if (subRoute.id === "4.2") {
			return isAuthenticated;
		}
		return true;
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
							{routes.filter(shouldShowRoute).map((route) => {
								// Check if route has subroutes
								if (route.subRoutes && route.subRoutes.length > 0) {
									// Filter visible subroutes
									const visibleSubRoutes =
										route.subRoutes.filter(shouldShowSubRoute);

									// Skip routes with no visible subroutes
									if (visibleSubRoutes.length === 0 && route.id === "4.0") {
										return null;
									}

									return (
										<NavigationMenuItem key={route.id}>
											<NavigationMenuTrigger
												className={cn(
													buttonVariants(),
													"h-9",
													activeSection === route.id &&
														"bg-foreground text-background",
												)}
												onClick={() => handleSectionChange(route.id)}
											>
												{route.label}
											</NavigationMenuTrigger>
											<NavigationMenuContent>
												<ul className="flex min-w-[150px] flex-col gap-1 p-1.5">
													{visibleSubRoutes.map((subRoute) => (
														<li key={subRoute.id} className="whitespace-nowrap">
															<Link
																href={subRoute.path}
																className="block rounded-md px-2 py-1.5 hover:bg-muted"
															>
																<div className="font-medium">
																	{subRoute.label}
																</div>
															</Link>
														</li>
													))}
												</ul>
											</NavigationMenuContent>
										</NavigationMenuItem>
									);
								}

								// Regular route without subroutes
								return (
									<NavigationMenuItem key={route.id}>
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
									</NavigationMenuItem>
								);
							})}
						</NavigationMenuList>
					</NavigationMenu>
					<ThemeToggle />
				</div>
			</div>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<nav className="absolute top-full right-0 left-0 z-50 flex flex-col gap-1.5 border-border border-t bg-background p-3 text-xs">
					{routes.filter(shouldShowRoute).map((route) => (
						<div key={route.id} className="w-full">
							{route.subRoutes && route.subRoutes.length > 0 ? (
								<div>
									<div className="flex w-full items-center">
										<Link
											href={route.path}
											className="block flex-1"
											onClick={() => handleSectionChange(route.id)}
										>
											<Button
												className={cn(
													"w-full justify-start",
													activeSection === route.id &&
														"bg-foreground text-background",
												)}
											>
												{route.label}
											</Button>
										</Link>
										<Button
											size="icon"
											variant="default"
											onClick={() => toggleExpanded(route.id)}
										>
											<ChevronDown
												size={16}
												className={cn(
													"transition-transform",
													expandedSection === route.id && "rotate-180",
												)}
											/>
										</Button>
									</div>

									{expandedSection === route.id && (
										<div className="mt-1.5 ml-3 space-y-1.5 border-muted border-l-2 pl-2">
											{route.subRoutes
												.filter(shouldShowSubRoute)
												.map((subRoute) => (
													<Link
														key={subRoute.id}
														href={subRoute.path}
														className="block w-full"
													>
														<Button
															variant="ghost"
															className="w-full justify-start hover:bg-foreground hover:text-background"
														>
															{subRoute.label}
														</Button>
													</Link>
												))}
										</div>
									)}
								</div>
							) : (
								<Link
									href={route.path}
									className="block w-full"
									onClick={() => handleSectionChange(route.id)}
								>
									<Button
										className={cn(
											"w-full justify-start",
											activeSection === route.id &&
												"bg-foreground text-background",
										)}
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
