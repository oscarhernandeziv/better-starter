"use client";

import { Footer } from "@/app/_components/shared/navigation/footer";
import { Header } from "@/app/_components/shared/navigation/header";
import type React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="flex min-h-screen flex-col bg-background p-4 font-mono text-foreground">
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden border border-border">
				<Header />

				<div className="grid flex-1 grid-rows-1">{children}</div>

				<Footer />
			</div>
		</div>
	);
}
