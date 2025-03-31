import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/app/providers/query-provider";
import { Toaster } from "./_components/ui/sonner";
import { ThemeProvider } from "./providers/theme-provider";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Better Starter",
	description: "A Next.js 15 starter kit for 2025.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* Emoji Favicon */}
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
				/>
			</head>

			<body className={`${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						{children}
						<Toaster
							position="bottom-right"
							richColors
							invert
							closeButton
							visibleToasts={5}
							expand={false}
							toastOptions={{
								duration: 1000,
							}}
						/>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
