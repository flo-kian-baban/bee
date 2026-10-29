"use client";

import { useEffect, useRef } from "react";
import { CELL_RADIUS, CELL_WIDTH, cellCentre, hexagon, ROW_HEIGHT } from "@/components/Honeycomb";

// Stitch's pace (DESIGN.md, Motion): each 60Hz frame, the light covers 15% of
// the way to the pointer, and each cell 10% of the way to its brightness.
const FOLLOW_PER_FRAME = 0.15;
const GLOW_PER_FRAME = 0.1;
const FRAME_MS = 1000 / 60;

/** A lit cell's 12% outline is fully in once its brightness reaches this. */
const OUTLINE_AT = 0.02;
/** Below this brightness, a fading cell is dark again. */
const DARK = 0.002;
/** The most cells lit at once: those within the radius, plus those still fading. */
const MAX_CELLS = 64;

/** Room around each cell for its glow. */
const MARGIN = 18;
const outline = hexagon(MARGIN + CELL_WIDTH / 2, MARGIN + CELL_RADIUS, CELL_RADIUS);
const inset = hexagon(MARGIN + CELL_WIDTH / 2, MARGIN + CELL_RADIUS, CELL_RADIUS - 1.5);

/** The same media query as the hero-light utility in app/globals.css. */
const SHOWN = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type Cell = { element: HTMLElement; outline: SVGElement; glow: SVGElement; brightness: number };
type Target = { column: number; row: number; brightness: number };

/**
 * The hero light (DESIGN.md, Motion), after Stitch: a light trails the mouse
 * pointer, and every honeycomb cell within its radius brightens by its centre's
 * distance from the light. Lit cells are copies of the template cell below,
 * made only where the light shows. Each is placed once; after that, only its
 * opacity changes. Pointer events write no React state, and frames are
 * requested only while the pointer moves and the cells settle.
 */
export function HeroLight() {
  const lightRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    const template = templateRef.current;
    const hero = light?.parentElement;
    if (!light || !template || !hero) return;

    const shown = window.matchMedia(SHOWN);
    let radius = 0;
    let pointerX = 0; // viewport coordinates
    let pointerY = 0;
    let x = 0; // the light, in hero coordinates
    let y = 0;
    let inside = false;
    let frame = 0;
    let lastTime = 0;
    const lit = new Map<string, Cell>();
    const spare: Cell[] = [];
    const made: HTMLElement[] = [];

    const placeCell = ({ column, row }: Target) => {
      let cell = spare.pop();
      if (!cell) {
        if (made.length === MAX_CELLS) return undefined;
        const element = template.cloneNode(true) as HTMLElement;
        light.append(element);
        made.push(element);
        const outlineLayer = element.firstElementChild as SVGElement;
        const glowLayer = element.lastElementChild as SVGElement;
        cell = { element, outline: outlineLayer, glow: glowLayer, brightness: 0 };
      }
      const centre = cellCentre(column, row);
      cell.element.style.transform = `translate(${centre.x - CELL_WIDTH / 2 - MARGIN}px, ${centre.y - CELL_RADIUS - MARGIN}px)`;
      cell.element.dataset.x = String(centre.x);
      cell.element.dataset.y = String(centre.y);
      return cell;
    };

    const setBrightness = (cell: Cell, brightness: number) => {
      if (brightness === cell.brightness) return;
      cell.brightness = brightness;
      cell.glow.style.opacity = String(brightness);
      cell.outline.style.opacity = String(Math.min(1, brightness / OUTLINE_AT));
    };

    /** The cells whose centres lie within the radius, and the brightness each aims for: (1 - d/r)². */
    const targetsAround = () => {
      const targets = new Map<string, Target>();
      const firstRow = Math.ceil((y - radius - CELL_RADIUS) / ROW_HEIGHT);
      const lastRow = Math.floor((y + radius - CELL_RADIUS) / ROW_HEIGHT);
      for (let row = firstRow; row <= lastRow; row++) {
        const shift = row % 2 === 0 ? 0 : CELL_WIDTH / 2;
        const firstColumn = Math.ceil((x - radius - CELL_WIDTH / 2 - shift) / CELL_WIDTH);
        const lastColumn = Math.floor((x + radius - CELL_WIDTH / 2 - shift) / CELL_WIDTH);
        for (let column = firstColumn; column <= lastColumn; column++) {
          const centre = cellCentre(column, row);
          const distance = Math.hypot(centre.x - x, centre.y - y);
          if (distance < radius) {
            targets.set(`${column},${row}`, { column, row, brightness: (1 - distance / radius) ** 2 });
          }
        }
      }
      return targets;
    };

    const tick = (time: number) => {
      const frames = lastTime ? (time - lastTime) / FRAME_MS : 1;
      lastTime = time;
      const bounds = hero.getBoundingClientRect();
      const pointerInHeroX = pointerX - bounds.left;
      const pointerInHeroY = pointerY - bounds.top;

      // A dark light starts at the pointer instead of travelling there.
      if (lit.size === 0) {
        x = pointerInHeroX;
        y = pointerInHeroY;
      }
      const follow = 1 - (1 - FOLLOW_PER_FRAME) ** frames;
      x += (pointerInHeroX - x) * follow;
      y += (pointerInHeroY - y) * follow;
      let settled = Math.hypot(pointerInHeroX - x, pointerInHeroY - y) < 0.1;
      if (settled) {
        x = pointerInHeroX;
        y = pointerInHeroY;
      }

      const targets = inside ? targetsAround() : new Map<string, Target>();
      for (const [key, target] of targets) {
        if (lit.has(key)) continue;
        const cell = placeCell(target);
        if (cell) lit.set(key, cell);
      }

      const ease = 1 - (1 - GLOW_PER_FRAME) ** frames;
      for (const [key, cell] of lit) {
        const target = targets.get(key)?.brightness ?? 0;
        let brightness = cell.brightness + (target - cell.brightness) * ease;
        if (Math.abs(target - brightness) < 0.001) brightness = target;
        else settled = false;
        if (target === 0 && brightness < DARK) {
          setBrightness(cell, 0);
          lit.delete(key);
          spare.push(cell);
        } else {
          setBrightness(cell, brightness);
        }
      }

      if (settled) {
        frame = 0;
        delete light.dataset.active;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      if (frame) return;
      lastTime = 0;
      light.dataset.active = "";
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      inside = true;
      start();
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      inside = false;
      start();
    };

    const enable = () => {
      radius = parseFloat(getComputedStyle(light).getPropertyValue("--hero-light-radius"));
      hero.addEventListener("pointermove", onPointerMove);
      hero.addEventListener("pointerleave", onPointerLeave);
    };
    const disable = () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      delete light.dataset.active;
      inside = false;
      lit.clear();
      spare.length = 0;
      made.forEach((element) => element.remove());
      made.length = 0;
    };
    const onShownChange = () => (shown.matches ? enable() : disable());

    if (shown.matches) enable();
    shown.addEventListener("change", onShownChange);
    return () => {
      shown.removeEventListener("change", onShownChange);
      disable();
    };
  }, []);

  const width = CELL_WIDTH + 2 * MARGIN;
  const height = 2 * CELL_RADIUS + 2 * MARGIN;

  return (
    <div ref={lightRef} aria-hidden className="hero-light pointer-events-none absolute inset-0 -z-10">
      {/* The template cell: a 12% outline, and a glow layer with the 14% fill and 65% outline. Both start dark. */}
      <div ref={templateRef} className="absolute top-0 left-0">
        <svg width={width} height={height} focusable="false" className="hero-cell-layer">
          <path d={outline} fill="none" strokeWidth={1} className="stroke-brand/12" />
        </svg>
        <svg width={width} height={height} focusable="false" className="hero-cell-layer drop-shadow-light">
          <path d={inset} className="fill-brand/14" />
          <path d={outline} fill="none" strokeWidth={1} className="stroke-brand/65" />
        </svg>
      </div>
    </div>
  );
}
