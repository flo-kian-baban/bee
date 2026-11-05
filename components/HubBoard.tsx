"use client";

import type { FocusEvent, PointerEvent, ReactNode } from "react";

/** The same media query that gates the motion in app/globals.css. */
const MOTION = "(prefers-reduced-motion: no-preference)";

/** Runs these elements' CSS animations again from the start. */
function restart(elements: (HTMLElement | SVGElement)[]) {
  for (const element of elements) element.style.animation = "none";
  for (const element of elements) void getComputedStyle(element).animationName;
  for (const element of elements) element.style.animation = "";
}

/**
 * Sends a card's connector flow across again, once: the corner connector
 * from 1024px, its stretch of the rail below. The hexagon lights again if
 * the connector runs into it. A connector still flowing is left alone.
 */
function replay(board: HTMLElement, card: Element) {
  if (!window.matchMedia(MOTION).matches) return;
  const index = card.getAttribute("data-hub-card");
  let intoHub = false;
  for (const link of board.querySelectorAll<HTMLElement>(`[data-hub-link="${index}"]`)) {
    // Each card has a connector for each layout; only one shows.
    if (link.getClientRects().length === 0) continue;
    const trains = [...link.querySelectorAll<HTMLElement>(".flow-train")];
    if (trains.some((train) => train.getAnimations().length > 0)) continue;
    link.setAttribute("data-replay", "");
    restart(trains);
    intoHub ||= link.closest("[data-hub-into]") !== null;
  }
  const light = board.querySelector<SVGElement>(".hub-light");
  if (intoHub && light) {
    light.setAttribute("data-replay", "");
    restart([light]);
  }
}

/** The card an event entered, if it came from outside that card. */
function enteredCard(event: PointerEvent | FocusEvent) {
  const card = event.target instanceof Element ? event.target.closest("[data-hub-card]") : null;
  if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return null;
  return card;
}

/**
 * The Problem section's cards and their hub (DESIGN.md, Problem card).
 * Hovering over a card with a mouse or pen, or moving focus into it, replays
 * its connector's flow (app/globals.css, hub flow). Touch is left out, so
 * scrolling the stack does not set it off.
 */
export function HubBoard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      data-hub-board=""
      className={className}
      onPointerOver={(event) => {
        if (event.pointerType === "touch") return;
        const card = enteredCard(event);
        if (card) replay(event.currentTarget, card);
      }}
      onFocus={(event) => {
        const card = enteredCard(event);
        if (card) replay(event.currentTarget, card);
      }}
    >
      {children}
    </div>
  );
}
