"use client";

import Link from "next/link";

export function Header() {
	return (
		<header className="relative border-border border-b p-4">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="text-sm">
					<div className="font-bold text-lg italic">Better Starter</div>
					<div className="text-muted-foreground text-xs">
						BNJS-1000 • JAN 2025
					</div>
				</Link>
			</div>
		</header>
	);
}
