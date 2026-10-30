"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** The same media query that gates the motion in app/globals.css. */
const MOTION = "(prefers-reduced-motion: no-preference)";

/**
 * Scroll motion (DESIGN.md, Motion): one IntersectionObserver for every
 * element marked data-reveal on the page. Elements already in view or above
 * it keep their final state. Each one below the viewport is marked pending,
 * which hides it, until it enters the viewport; then it is marked shown,
 * which runs its motion once, and is no longer observed. Elements that enter
 * together follow one another, --motion-reveal-stagger apart, in page order.
 * Nothing happens with reduced motion, so every element keeps its final state.
 */
export function Reveal() {
  // The layout stays mounted across pages, so each new page is looked at again.
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(MOTION).matches) return;

    const stagger = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--motion-reveal-stagger"),
    );
    const pending = [...document.querySelectorAll<HTMLElement | SVGElement>("[data-reveal]")].filter(
      (element) => !element.hasAttribute("data-shown") && element.getBoundingClientRect().top >= window.innerHeight,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach(({ target }, index) => {
            const element = target as HTMLElement | SVGElement;
            observer.unobserve(element);
            element.style.setProperty("--reveal-delay", `${index * stagger}ms`);
            element.removeAttribute("data-pending");
            element.setAttribute("data-shown", "");
          });
      },
      // Elements start once they are a little way into the viewport.
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const element of pending) {
      element.setAttribute("data-pending", "");
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of pending) element.removeAttribute("data-pending");
    };
  }, [pathname]);

  return null;
}
