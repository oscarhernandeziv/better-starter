"use client";

import { TodoAuthPrompt } from "@/app/_components/pages/todo/todo-auth-prompt";
import { TodoContent } from "@/app/_components/pages/todo/todo-content";
import { TodoInfo } from "@/app/_components/pages/todo/todo-info";
import { Layout } from "@/app/_components/shared/layout";
import { useClientAuthProtection } from "@/src/hooks/use-client-auth-protection";
import { QueryProvider } from "@/src/providers/query-provider";

export default function TodoPage() {
	const { isAuthenticated, isLoading } = useClientAuthProtection();

	return (
		<Layout>
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<div className="flex h-full flex-col p-6">
					<TodoInfo />
				</div>

				<div className="flex h-full flex-col items-center justify-center border-l bg-muted/40 p-6">
					{isLoading ? (
						<div>Loading...</div>
					) : isAuthenticated ? (
						<QueryProvider>
							<TodoContent />
						</QueryProvider>
					) : (
						<TodoAuthPrompt />
					)}
				</div>
			</div>
		</Layout>
	);
}
