import { Layout } from "@/app/_components/shared/layout";

/**
 * Dashboard page
 * This page is protected at the layout level in (protected)/layout.tsx
 * No need for additional protection at the page level
 */
export default function DashboardPage() {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center p-6">
				<h1 className="mb-4 font-bold text-3xl">Dashboard</h1>
				<p className="max-w-md text-center">
					This is a protected page using server-side route protection instead of
					middleware (which is vulnerable to CVE-2025-29927).
				</p>
			</div>
		</Layout>
	);
}
