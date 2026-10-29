import type { ComponentProps } from "react";
import { AppLink, type AppLinkProps } from "@/components/AppLink";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

// Every variant has a 1px border (transparent where none shows) so buttons
// side by side share one height.
const base =
  "inline-flex items-center justify-center gap-2 border transition-[color,background-color,border-color,box-shadow,scale]";

// 44, 48 and 52px tall (DESIGN.md, Buttons): the nav, the hero and the pilot band.
const sizes: Record<Size, string> = {
  sm: "min-h-11 rounded-tile px-4 type-button sm:px-5",
  md: "min-h-12 rounded-container px-7 type-button duration-200",
  lg: "min-h-13 rounded-container px-8 type-button duration-200",
};

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-brand font-semibold text-on-brand hover:bg-brand-hover active:scale-98",
  secondary:
    "border-divider bg-card/80 font-normal text-text shadow-sm backdrop-blur-md hover:border-brand/50 hover:bg-card hover:text-brand",
  ghost: "border-transparent font-semibold text-text-secondary hover:text-text",
};

// Primary buttons glow at rest and more on hover, by size.
const glows: Record<Size, string> = {
  sm: "shadow-glow-sm hover:shadow-glow-sm-hover",
  md: "shadow-glow hover:shadow-glow-hover",
  lg: "shadow-glow-lg hover:shadow-glow-lg-hover",
};

type ButtonProps = { variant?: Variant; size?: Size } & (
  | AppLinkProps
  | (ComponentProps<"button"> & { href?: undefined })
);

/** Renders a link when given `href`, otherwise a <button>. */
export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classes = [base, sizes[size], variants[variant], variant === "primary" && glows[size], className]
    .filter(Boolean)
    .join(" ");
  if (props.href !== undefined) {
    return <AppLink {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}
