"use client";

import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import { toast } from "sonner";

export function ToastExamples() {
	// Regular toast examples
	const showBasicToast = () => toast("This is a basic toast message");
	const showSuccessToast = () =>
		toast.success("Your operation was successful!");
	const showErrorToast = () => toast.error("Something went wrong");
	const showLoadingToast = () => toast.loading("Loading data...");

	// Advanced toast examples
	const showActionToast = () => {
		toast("Action required", {
			action: {
				label: "Undo",
				onClick: () => toast("Undo action performed!"),
			},
		});
	};

	const showCustomToast = () => {
		toast(
			<div className="flex flex-col gap-1">
				<p className="font-medium">Custom Toast</p>
				<p className="text-xs opacity-80">
					This is a custom toast with JSX content
				</p>
			</div>,
		);
	};

	// Promise toast example
	const showPromiseToast = () => {
		// Define the expected result type
		type PromiseResult = { message: string };

		const fakePromise = new Promise<PromiseResult>((resolve, reject) => {
			setTimeout(() => {
				// 80% chance of success
				if (Math.random() > 0.2) {
					resolve({ message: "Data loaded successfully" });
				} else {
					reject(new Error("Failed to load data"));
				}
			}, 2000);
		});

		toast.promise(fakePromise, {
			loading: "Loading data...",
			success: (data: PromiseResult) => `Success: ${data.message}`,
			error: (error: Error) => `Error: ${error.message}`,
			duration: 5000,
		});
	};

	return (
		<Card className="mx-auto w-full max-w-lg">
			<CardHeader>
				<CardTitle>Toast Examples</CardTitle>
				<CardDescription>
					Click the buttons below to see different toast notifications
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<div className="grid grid-cols-2 gap-3">
					<Button onClick={showBasicToast} variant="outline">
						Basic Toast
					</Button>
					<Button onClick={showSuccessToast} variant="outline">
						Success Toast
					</Button>
					<Button onClick={showErrorToast} variant="outline">
						Error Toast
					</Button>
					<Button onClick={showLoadingToast} variant="outline">
						Loading Toast
					</Button>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-3">
				<div className="grid w-full grid-cols-2 gap-3">
					<Button onClick={showActionToast}>Action Toast</Button>
					<Button onClick={showCustomToast}>Custom Toast</Button>
					<Button onClick={showPromiseToast}>Promise Toast</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
