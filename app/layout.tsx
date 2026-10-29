import { LucideProvider } from "lucide-react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { business, meta, ui } from "@/content/site";
import "./globals.css";

// Only the weights DESIGN.md uses: display 600; h2, h3 and button 500; body 400; label 500.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space-grotesk",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: business.siteUrl ? new URL(business.siteUrl) : undefined,
  title: meta.title,
  description: meta.description,
  // Kept out of search engines until launch is approved (see next.config.ts).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* Icons: 1.5px stroke at any size (DESIGN.md "Icons and imagery"). */}
        <LucideProvider strokeWidth={1.5} absoluteStrokeWidth>
          <a
            href="#main-content"
            className="fixed top-3 left-6 z-60 -translate-y-24 rounded-container bg-brand px-6 py-3 type-button text-on-brand focus:translate-y-0"
          >
            {ui.skipToContent}
          </a>
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LucideProvider>
      </body>
    </html>
  );
}
