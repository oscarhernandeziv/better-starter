"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import type { WaitlistFormData } from "@/src/entities/models/waitlist";
import { CheckCircle } from "lucide-react";

export function WaitlistSuccess({
	data,
	onReset,
}: {
	data: WaitlistFormData;
	onReset: () => void;
}) {
	return (
		<Card className="w-full">
			<CardHeader className="pb-2">
				<div className="flex items-center gap-2">
					<CheckCircle className="h-6 w-6 text-green-500" />
					<CardTitle>Thanks for Joining!</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-2 pb-2">
				<p className="text-muted-foreground">
					We've received your request to join our waitlist. We'll be in touch
					soon!
				</p>

				<div className="mt-4 rounded-md bg-muted p-3">
					<div className="text-muted-foreground">
						<p>
							<span className="font-medium">Email:</span> {data.email}
						</p>
						<p>
							<span className="font-medium">Name:</span> {data.name}
						</p>

						{data.companyName && (
							<p>
								<span className="font-medium">Company:</span> {data.companyName}
							</p>
						)}
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" onClick={onReset} className="w-full">
					Start Over
				</Button>
			</CardFooter>
		</Card>
	);
}
