import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy | Better Starter",
	description: "Privacy policy for Better Starter application",
};

export default function PrivacyPolicyPage() {
	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<h1 className="mb-8 font-bold text-4xl">Privacy Policy</h1>

			<div className="prose prose-lg dark:prose-invert">
				<p className="mb-6 text-muted-foreground">
					Last updated: {new Date().toLocaleDateString()}
				</p>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">1. Introduction</h2>
					<p>
						At Better Starter, we take your privacy seriously. This Privacy
						Policy explains how we collect, use, disclose, and safeguard your
						information when you use our application.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						2. Information We Collect
					</h2>
					<h3 className="mb-2 font-semibold text-xl">
						2.1 Personal Information
					</h3>
					<p>
						We may collect personal information that you voluntarily provide to
						us when you:
					</p>
					<ul className="mb-4 list-disc pl-6">
						<li>Create an account</li>
						<li>Sign in using social authentication</li>
						<li>Contact us for support</li>
						<li>Subscribe to our newsletter</li>
					</ul>
					<p>This information may include:</p>
					<ul className="list-disc pl-6">
						<li>Name and contact information</li>
						<li>Email address</li>
						<li>Profile information</li>
						<li>Authentication data</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						3. How We Use Your Information
					</h2>
					<p>We use the information we collect to:</p>
					<ul className="list-disc pl-6">
						<li>Provide and maintain our services</li>
						<li>Process your transactions</li>
						<li>Send you technical notices and support messages</li>
						<li>Communicate with you about products, services, and events</li>
						<li>Respond to your comments and questions</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">
						4. Information Sharing
					</h2>
					<p>
						We do not sell or rent your personal information to third parties.
						We may share your information with:
					</p>
					<ul className="list-disc pl-6">
						<li>Service providers who assist in our operations</li>
						<li>Professional advisors</li>
						<li>Law enforcement when required by law</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">5. Data Security</h2>
					<p>
						We implement appropriate technical and organizational security
						measures to protect your personal information. However, no method of
						transmission over the Internet is 100% secure.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">6. Your Rights</h2>
					<p>You have the right to:</p>
					<ul className="list-disc pl-6">
						<li>Access your personal information</li>
						<li>Correct inaccurate information</li>
						<li>Request deletion of your information</li>
						<li>Object to processing of your information</li>
						<li>Request data portability</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 font-semibold text-2xl">7. Contact Us</h2>
					<p>
						If you have any questions about this Privacy Policy, please contact
						us at:
						<br />
						Email: privacy@betterstarter.com
					</p>
				</section>
			</div>
		</div>
	);
}
