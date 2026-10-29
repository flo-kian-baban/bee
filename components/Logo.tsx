import { BRAND } from "@/content/site";

/**
 * The two-colour "bee" wordmark, for dark backgrounds only. 28px tall.
 * PNG placeholder made from reference/B-E-E-main-Logo.png until the final SVGs
 * arrive; swap the file, keep the component.
 */
export function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image would add an inline style, which the CSP blocks, and gains nothing at 28px.
    <img
      src="/brand/bee-logo-placeholder.png"
      alt={BRAND}
      width={63}
      height={28}
      className="h-(--logo-height) w-auto"
    />
  );
}
