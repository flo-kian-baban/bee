import type { ComponentProps } from "react";
import { AppLink, type AppLinkProps } from "@/components/AppLink";

type Variant = "primary" | "secondary" | "ghost";

// Every variant has a 1px border (transparent where none shows) so buttons
// side by side share one height.
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-container border px-6 py-3 type-button transition-[color,background-color,border-color] duration-150 ease-out";

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-brand text-on-brand hover:bg-brand-hover hover:shadow-glow",
  secondary: "border-control-border bg-card text-text hover:border-brand",
  ghost: "border-transparent text-text-secondary hover:text-text",
};

type ButtonProps = { variant?: Variant } & (
  | AppLinkProps
  | (ComponentProps<"button"> & { href?: undefined })
);

/** Renders a link when given `href`, otherwise a <button>. */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");
  if (props.href !== undefined) {
    return <AppLink {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}
