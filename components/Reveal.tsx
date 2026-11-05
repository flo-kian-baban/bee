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
 * The Problem hub's triggers, marked data-reveal="hub", run its flow once the
 * same way (app/globals.css, hub flow). The Evidence chain's flow, marked
 * data-reveal="flow", stays observed: it is marked in view whenever it is,
 * and its dots move only then. Nothing happens
 * with reduced motion, so every element keeps its final state and the flow
 * never runs.
 */
export function Reveal() {
  // The layout stays mounted across pages, so each new page is looked at again.
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(MOTION).matches) return;

    const stagger = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--motion-reveal-stagger"),
    );
    const flows = [...document.querySelectorAll<HTMLElement | SVGElement>('[data-reveal="flow"]')];
    const pending = [...document.querySelectorAll<HTMLElement | SVGElement>("[data-reveal]")].filter(
      (element) =>
        !flows.includes(element) &&
        !element.hasAttribute("data-shown") &&
        element.getBoundingClientRect().top >= window.innerHeight,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        let entering = 0;
        for (const { target, isIntersecting } of entries) {
          const element = target as HTMLElement | SVGElement;
          if (flows.includes(element)) {
            element.toggleAttribute("data-in-view", isIntersecting);
          } else if (isIntersecting) {
            observer.unobserve(element);
            element.style.setProperty("--reveal-delay", `${entering++ * stagger}ms`);
            element.removeAttribute("data-pending");
            element.setAttribute("data-shown", "");
          }
        }
      },
      // Elements start once they are a little way into the viewport.
      { rootMargin: "0px 0px -10% 0px" },
    );

    for (const element of pending) {
      element.setAttribute("data-pending", "");
      observer.observe(element);
    }
    for (const element of flows) observer.observe(element);

    return () => {
      observer.disconnect();
      for (const element of pending) element.removeAttribute("data-pending");
      for (const element of flows) element.removeAttribute("data-in-view");
    };
  }, [pathname]);

  return null;
}
