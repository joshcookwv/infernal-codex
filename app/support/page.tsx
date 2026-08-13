import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Infernal Codex, report a problem, or read the FAQ.",
  alternates: { canonical: absoluteUrl("/support/") },
};

const faqs = [
  { question: "Where can I get Infernal Codex?", answer: "Android production release work is in progress. This page will link to the verified Google Play listing when it is public." },
  { question: "Where is my campaign data stored?", answer: "Ordinary campaign records are stored locally by the app. See the Privacy Policy for the complete, current data-handling explanation." },
  { question: "Do I have to use AI features?", answer: "No. AI tools are optional actions, and the standard campaign tools do not require you to invoke them." },
  { question: "Is the desktop edition available?", answer: "Not yet. A Windows desktop edition is in development, and approved progress will be shared in News and the Roadmap." },
  { question: "How do I report a problem?", answer: "Use the public issue tracker for non-sensitive bugs or email the support address for account, purchase, or privacy questions." },
] as const;

export default function SupportPage() {
  return (
    <div className="shell page-section">
      <h1>Support</h1>
      <div className="panel">
        <p>
          Email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> for
          account, purchase, or privacy questions.
        </p>
        <p>
          Report a problem on the{" "}
          <a href={`${siteConfig.mobileGithubUrl}/issues/new`}>public issue tracker</a>.
        </p>
        <p>
          Read the <a href={siteConfig.privacyUrl}>Privacy Policy</a> and{" "}
          <a href={siteConfig.licensesUrl}>Licenses</a>.
        </p>
      </div>

      <h2>FAQ</h2>
      <dl className="faq-list">
        {faqs.map((faq) => (
          <div key={faq.question} className="panel faq-item">
            <dt>{faq.question}</dt>
            <dd>{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
