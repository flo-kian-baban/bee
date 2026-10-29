import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { notFoundPage } from "@/content/site";

export const metadata: Metadata = {
  title: notFoundPage.heading,
};

export default function NotFound() {
  return (
    <div className="page-container section-y">
      <h1 className="type-h2">{notFoundPage.heading}</h1>
      <p className="mt-4 type-body-lg text-text-secondary">{notFoundPage.text}</p>
      <Button href={notFoundPage.cta.href} className="mt-8">
        {notFoundPage.cta.label}
      </Button>
    </div>
  );
}
