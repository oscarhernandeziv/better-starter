"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			// Default duration of 4 seconds
			duration={4000}
			// Improved accessibility
			closeButton={true}
			// Add gap between toasts
			gap={10}
			// Custom container aria label for accessibility
			containerAriaLabel="Notifications"
			{...props}
		/>
	);
};

export { Toaster };
export { toast } from "sonner";
