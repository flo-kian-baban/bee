import { BRAND } from "@/content/site";

/**
 * The "bee" wordmark, for dark backgrounds only. 28px tall.
 * PNG placeholder until the final SVGs arrive; swap the file, keep the component.
 */
export function Logo() {
  return (
    <img
      src="/brand/bee-wordmark-placeholder.png"
      alt={BRAND}
      width={73}
      height={28}
      className="h-(--logo-height) w-auto"
    />
  );
}
