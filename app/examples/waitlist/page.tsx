"use client";

import { WaitlistForm } from "@/app/_components/pages/waitlist/waitlist-form";
import { Layout } from "@/app/_components/shared/layout";

export default function WaitlistExamplePage() {
	return (
		<Layout>
			<div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2">
				<div className="flex h-full flex-col p-6">
					<h2 className="mb-2 font-bold text-2xl">Waitlist Example</h2>
					<p className="mb-4 text-sm leading-relaxed">
						This example showcases a waitlist signup form with type-safe and
						validated form handling using React Hook Form and Zod.
					</p>

					<div className="mb-4">
						<h3 className="mb-2 font-semibold">Features:</h3>
						<ul className="list-disc space-y-2 pl-5 text-sm">
							<li>Type-safe form validation with zod integration</li>
							<li>Multi-step form with conditional fields</li>
							<li>Server-side validation with proper error handling</li>
							<li>Form state persistence between steps</li>
							<li>Clean architecture pattern with:</li>
							<ul className="mt-1 ml-5 list-[circle] space-y-1">
								<li>
									Domain models and schemas in <code>entities/models</code>
								</li>
								<li>
									Database operations in <code>repositories</code>
								</li>
								<li>
									Business logic in <code>services</code>
								</li>
								<li>
									Client-server communication via <code>actions</code>
								</li>
								<li>UI state management with custom hooks</li>
							</ul>
						</ul>
					</div>
				</div>

				<div className="flex h-full flex-col items-center justify-center border-l bg-muted/40 p-6">
					<WaitlistForm />
				</div>
			</div>
		</Layout>
	);
}
