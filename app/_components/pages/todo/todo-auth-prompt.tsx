import { Button } from "@/app/_components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/_components/ui/card";
import Link from "next/link";

export function TodoAuthPrompt() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Sign in required</CardTitle>
				<CardDescription>
					You need to sign in to use the Todo feature
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm">
					To create and manage your todo items, please sign in to your account.
				</p>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link href="/sign-in">Sign in</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
