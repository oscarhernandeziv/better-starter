import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service | Better Starter",
	description: "Terms of service for Better Starter application",
};

export default function TermsOfServicePage() {
	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<h1 className="mb-8 font-bold text-4xl">Terms of Service</h1>

			<div className="prose prose-lg dark:prose-invert">
				<p className="mb-6 text-muted-foreground">
					Last updated: {new Date().toLocaleDateString()}
				</p>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">1. Agreement to Terms</h2>
					<p>
						By accessing or using Better Starter, you agree to be bound by these
						Terms of Service. If you disagree with any part of these terms, you
						may not access the service.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						2. Description of Service
					</h2>
					<p>
						Better Starter provides a web application platform that allows users
						to create and manage their projects. The service includes features
						such as:
					</p>
					<ul className="list-disc pl-6">
						<li>User authentication and authorization</li>
						<li>Project management tools</li>
						<li>Data storage and retrieval</li>
						<li>API access</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">3. User Accounts</h2>
					<p>
						When you create an account with us, you must provide accurate,
						complete, and current information. Failure to do so constitutes a
						breach of the Terms, which may result in immediate termination of
						your account.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						4. User Responsibilities
					</h2>
					<p>You are responsible for:</p>
					<ul className="list-disc pl-6">
						<li>Maintaining the confidentiality of your account</li>
						<li>All activities that occur under your account</li>
						<li>Ensuring your use complies with applicable laws</li>
						<li>Not using the service for any illegal purposes</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						5. Intellectual Property
					</h2>
					<p>
						The service and its original content, features, and functionality
						are owned by Better Starter and are protected by international
						copyright, trademark, patent, trade secret, and other intellectual
						property laws.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						6. Service Modifications
					</h2>
					<p>
						We reserve the right to withdraw or amend our service, and any
						service or material we provide, in our sole discretion without
						notice. We will not be liable if, for any reason, all or any part of
						the service is unavailable at any time or for any period.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						7. Limitation of Liability
					</h2>
					<p>
						In no event shall Better Starter, nor its directors, employees,
						partners, agents, suppliers, or affiliates, be liable for any
						indirect, incidental, special, consequential, or punitive damages,
						including without limitation, loss of profits, data, use, goodwill,
						or other intangible losses.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">8. Changes to Terms</h2>
					<p>
						We reserve the right to modify or replace these Terms at any time.
						If a revision is material, we will provide at least 30 days' notice
						prior to any new terms taking effect.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						9. Contact Information
					</h2>
					<p>
						If you have any questions about these Terms, please contact us at:
						<br />
						Email: legal@betterstarter.com
					</p>
				</section>
			</div>
		</div>
	);
}
