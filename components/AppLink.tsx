import Link from "next/link";
import type { ComponentProps } from "react";

export type AppLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * Routes ("/pilot") go through next/link. Section anchors ("/#buildings"),
 * mailto: and external URLs stay plain <a> elements, so the browser handles
 * in-page jumps natively and moves keyboard focus with the scroll.
 */
export function AppLink({ href, ...props }: AppLinkProps) {
  if (href.startsWith("/") && !href.includes("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} {...props} />;
}
