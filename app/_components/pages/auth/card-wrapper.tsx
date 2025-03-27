"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
	children: React.ReactNode;
	cardTitle: string;
	cardDescription: string;
	cardFooterDescription?: string;
	cardFooterLink?: string;
	cardFooterLinkTitle?: string;
}

export function CardWrapper({
	children,
	cardTitle,
	cardDescription,
	cardFooterDescription,
	cardFooterLink,
	cardFooterLinkTitle,
}: CardWrapperProps) {
	return (
		<Card className="mx-auto w-full max-w-md shadow-md">
			<CardHeader>
				<CardTitle className="text-center font-semibold text-2xl">
					{cardTitle}
				</CardTitle>
				<CardDescription className="mt-2 text-center text-sm">
					{cardDescription}
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{cardFooterDescription && cardFooterLink && cardFooterLinkTitle && (
				<CardFooter className="flex justify-center">
					<p className="text-muted-foreground text-sm">
						{cardFooterDescription}{" "}
						<Link
							href={cardFooterLink}
							className="font-medium text-primary hover:underline"
						>
							{cardFooterLinkTitle}
						</Link>
					</p>
				</CardFooter>
			)}
		</Card>
	);
}
