import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/app/_components/utils";

function NavigationMenu({
	className,
	children,
	viewport = true,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			// data-viewport={viewport}
			className={cn(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			{/* {viewport && <NavigationMenuViewport />} */}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-1",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	);
}

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-sm outline-ring/50 ring-ring/10 transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:hover:bg-accent dark:outline-ring/40 dark:ring-ring/20",
);

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "group", className)}
			{...props}
		>
			{children}{" "}
			<ChevronDownIcon
				className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			/* Changed to support origin-aware animation */
			className={cn(
				"absolute left-0",
				"absolute top-full mt-[3px] w-fit bg-popover",
				"data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
				"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 absolute mt-1 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-visible rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]",
				className,
			)}
			{...props}
		/>
	);
}

// function NavigationMenuViewport({
// 	className,
// 	...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
// 	return (
// 		<div
// 			className={cn(
// 				"absolute top-full left-0 isolate z-50 flex justify-center",
// 			)}
// 		>
// 			<NavigationMenuPrimitive.Viewport
// 				data-slot="navigation-menu-viewport"
// 				className={cn(
// 					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]",
// 					className,
// 				)}
// 				{...props}
// 			/>
// 		</div>
// 	);
// }

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"flex flex-col gap-1 rounded-sm px-2 py-1.5 text-sm outline-ring/50 ring-ring/10 transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-4 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent dark:outline-ring/40 dark:ring-ring/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				"data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in",
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	// NavigationMenuViewport,
	navigationMenuTriggerStyle,
};
