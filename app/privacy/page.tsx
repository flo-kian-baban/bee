import type { Metadata } from "next";
import { privacyPage } from "@/content/site";

// A placeholder until the approved text arrives (CONTENT.md, Privacy page).
// Kept out of search engines on its own account, whatever the site does at launch.
export const metadata: Metadata = {
  title: privacyPage.heading,
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="page-container section-y">
      <h1 className="type-h2 text-text">{privacyPage.heading}</h1>
      <p className="mt-4 type-body-lg text-text-secondary">{privacyPage.placeholder}</p>
    </div>
  );
}
