"use client";

import { Pause, Play } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/Button";
import { ExampleLabel } from "@/components/ExampleLabel";
import { hexagon } from "@/components/Honeycomb";
import { ValueTag } from "@/components/ValueTag";
import { evidenceChain, type StepNumber } from "@/content/site";

const { steps } = evidenceChain;
type Step = (typeof steps)[number];
const byNumber = new Map(steps.map((step) => [step.number, step]));

/** Every step a step is worked out from, directly or through others. */
function upstreamOf(number: StepNumber): StepNumber[] {
  return (byNumber.get(number)?.from ?? []).flatMap((input) => [input, ...upstreamOf(input)]);
}

/** How many connectors the flow crosses to reach a step: none for the steps it starts from. */
function depthOf(number: StepNumber): number {
  const inputs = byNumber.get(number)?.from ?? [];
  return inputs.length ? 1 + Math.max(...inputs.map(depthOf)) : 0;
}

const upstream = new Map(steps.map((step) => [step.number, upstreamOf(step.number)]));
const depths = new Map(steps.map((step) => [step.number, depthOf(step.number)]));

// How many steps into each cycle a connector's leg starts, or a step lights
// (app/globals.css, flow): a connector leaves a step that many connectors on
// from the start, and a step lights as the last connector into it arrives.
const stages = ["[--flow-stage:0]", "[--flow-stage:1]", "[--flow-stage:2]"];

// The steps that light as the dots reach them: the model, where every stream
// converges, and the review it leads to (DESIGN.md, Motion).
const lights = new Set<StepNumber>(["06", "07"]);

type Connector = { from: StepNumber; to: StepNumber; name: string };

/** One connector per input, from the earlier step to the later. */
const connectors: Connector[] = steps.flatMap((step) =>
  step.from.map((from) => ({ from, to: step.number, name: `${from}-${step.number}` })),
);

// Each step's place on the comb: 01 and 04 on top; 03, 06 and 07 in the
// middle; 02 and 05 below. Columns are half a pitch apart, so the top and
// bottom rows sit half a cell left of the middle one, and every connector
// points right. The class gives the same place to CSS (app/globals.css).
const places: Record<StepNumber, { row: number; className: string }> = {
  "01": { row: 0, className: "[--comb-col:0] [--comb-row:0]" },
  "02": { row: 2, className: "[--comb-col:0] [--comb-row:2]" },
  "03": { row: 1, className: "[--comb-col:1] [--comb-row:1]" },
  "04": { row: 0, className: "[--comb-col:2] [--comb-row:0]" },
  "05": { row: 2, className: "[--comb-col:2] [--comb-row:2]" },
  "06": { row: 1, className: "[--comb-col:3] [--comb-row:1]" },
  "07": { row: 1, className: "[--comb-col:5] [--comb-row:1]" },
};

/** The wall a connector leaves by: the right one, or the lower or upper right one to change rows. */
function wallOf({ from, to }: Connector) {
  const rise = places[to].row - places[from].row;
  return rise > 0 ? "comb-link-se" : rise < 0 ? "comb-link-ne" : "comb-link-e";
}

// A cell's and a badge's outline, stretched over its box, which has the same
// proportions, and a cell's focus ring: a 2px line 2px clear of its walls.
// CELL is --comb-cell, the comb's cell width at full size.
const CELL = 272;
const HEX_WIDTH = Math.sqrt(3) * 500;
const outline = hexagon(HEX_WIDTH / 2, 500, 500);
const ring = hexagon(HEX_WIDTH / 2, 500, 500 * (1 + 3 / (CELL / 2)));

/** The outline at rest: an edge line, or brand at 60% on 06, the hub. */
const rest = (number: StepNumber) => (number === "06" ? "stroke-brand/60" : "stroke-edge");

/** A connector's dots: 2px, 6px apart. */
const dots = { fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeDasharray: "0 6" } as const;

/** "Based on 03 Assume, 04 Extract, 05 Normalize": what a step is worked out from, for screen readers. */
const basedOn = (step: Step) =>
  `${evidenceChain.basedOn} ${step.from.map((number) => `${number} ${byNumber.get(number)?.action}`).join(", ")}`;

/**
 * A dotted line down its box, and the train of dots that crosses it in its
 * stage's leg. In the comb, ports mark the walls it joins, and the line and
 * ports turn brand when its group is lit.
 */
function Track({ stage, ports = false }: { stage: number; ports?: boolean }) {
  const ink = "transition-colors duration-200";
  return (
    <>
      <svg aria-hidden="true" focusable="false" className="absolute inset-0 size-full overflow-visible">
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          {...dots}
          className={`stroke-chip-border group-data-lit:stroke-brand/80 ${ink}`}
        />
        {ports &&
          ["0", "100%"].map((y) => (
            <circle
              key={y}
              data-port=""
              cx="50%"
              cy={y}
              r={3}
              className={`fill-chip-border group-data-lit:fill-brand ${ink}`}
            />
          ))}
      </svg>
      <span className="flow-track">
        <span className={`flow-train ${stages[stage]}`}>
          <span className="flow-dot size-1 opacity-50" />
          <span className="flow-dot size-[5px] opacity-75" />
          <span className="flow-dot size-1.5" />
        </span>
      </span>
    </>
  );
}

/** The outline that lights as the dots reach a step: 2px of brand, glowing. */
function Light({ number }: { number: StepNumber }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${HEX_WIDTH} 1000`}
      preserveAspectRatio="none"
      className={`flow-light ${stages[(depths.get(number) ?? 1) - 1]} absolute inset-0 -z-10 size-full overflow-visible drop-shadow-light`}
    >
      <path d={outline} vectorEffect="non-scaling-stroke" strokeWidth={2} className="fill-none stroke-brand" />
    </svg>
  );
}

/**
 * From 1024px: the steps as cells of a comb, scaled to the column (app/
 * globals.css, comb). Hovering, focusing or tapping a cell lights it and every
 * cell and connector upstream of it.
 */
function Comb() {
  const [active, setActive] = useState<StepNumber | null>(null);
  const lit = new Set(active ? [active, ...(upstream.get(active) ?? [])] : []);

  return (
    <div data-reveal="up" className="comb-frame hidden lg:block">
      <div className="comb-sizer">
        <div className="comb">
          <ol>
            {steps.map((step) => {
              const id = `evidence-${step.number}`;
              return (
                <li key={step.number} className={`comb-cell ${places[step.number].className}`}>
                  <button
                    type="button"
                    data-step={step.number}
                    data-lit={lit.has(step.number) ? "" : undefined}
                    data-active={step.number === active ? "" : undefined}
                    aria-labelledby={`${id}-label ${id}-title ${id}-text ${id}-tag`}
                    aria-describedby={step.from.length ? `${id}-from` : undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setActive(step.number);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") setActive(null);
                    }}
                    onFocus={() => setActive(step.number)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(step.number)}
                    className="group pointer-events-none isolate flex size-full flex-col items-center justify-center text-center focus-visible:outline-none"
                  >
                    {/* The cell, whose hexagon alone takes the pointer, and its focus ring. */}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox={`0 0 ${HEX_WIDTH} 1000`}
                      preserveAspectRatio="none"
                      className="absolute inset-0 -z-10 size-full overflow-visible"
                    >
                      <path
                        d={outline}
                        vectorEffect="non-scaling-stroke"
                        className={`pointer-events-auto fill-card ${rest(step.number)} transition-colors duration-200 group-data-lit:stroke-brand/60 group-data-active:fill-[color-mix(in_srgb,var(--color-brand)_6%,var(--color-card))] group-data-active:stroke-brand group-data-active:stroke-2`}
                      />
                      <path
                        d={ring}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={2}
                        className="hidden fill-none stroke-brand group-focus-visible:inline"
                      />
                    </svg>
                    {lights.has(step.number) && <Light number={step.number} />}

                    {/* One grid for every cell: rows 16, 22, 104 (four lines) and
                        22px tall, centred, so the lines in each row of cells align.
                        The button is named by all it shows, in order, so its name
                        holds its visible text (WCAG 2.5.3, Label in Name); the
                        spaces keep the parts apart as words. The steps it is
                        based on describe it. */}
                    <span id={`${id}-label`} data-part="label" className="h-4 type-label font-medium whitespace-nowrap">
                      <span className="text-brand">{step.number}</span>{" "}
                      <span className="text-text-secondary transition-colors duration-200 group-data-lit:text-brand">
                        {step.action}
                      </span>
                    </span>{" "}
                    <span id={`${id}-title`} data-part="title" className="mt-2 h-5.5 w-59 type-cell text-text">
                      {step.title}
                    </span>{" "}
                    <span
                      id={`${id}-text`}
                      data-part="text"
                      className="mt-1.5 h-26 w-59 type-body text-balance text-text-secondary"
                    >
                      {step.text}
                    </span>{" "}
                    <span id={`${id}-tag`} data-part="tag" className="mt-3 flex h-5.5 items-center">
                      <ValueTag kind={step.tag} />
                    </span>
                    {step.from.length > 0 && (
                      <span id={`${id}-from`} className="sr-only">
                        {basedOn(step)}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          {connectors.map((connector) => (
            <span
              key={connector.name}
              aria-hidden="true"
              data-connector={connector.name}
              data-lit={lit.has(connector.to) ? "" : undefined}
              className={`group comb-link pointer-events-none ${wallOf(connector)} ${places[connector.from].className}`}
            >
              <Track stage={depths.get(connector.from) ?? 0} ports />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Below 1024px: the steps in number order, their badges on a dotted rail. */
function List() {
  return (
    <ol data-reveal="up" className="flex max-w-2xl flex-col lg:hidden">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.number} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4">
            {/* The badge, and the rail down to the next one. */}
            <span aria-hidden="true" className="flex flex-col items-center">
              <span data-badge="" className="relative flex aspect-[0.8660254] w-8 shrink-0 items-center justify-center">
                <svg
                  focusable="false"
                  viewBox={`0 0 ${HEX_WIDTH} 1000`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full overflow-visible"
                >
                  <path d={outline} vectorEffect="non-scaling-stroke" className={`fill-card ${rest(step.number)}`} />
                </svg>
                {lights.has(step.number) && <Light number={step.number} />}
                <span className="relative type-label text-brand tabular-nums">{step.number}</span>
              </span>
              {!last && (
                <span data-rail="" className="relative w-6 flex-1">
                  <Track stage={depths.get(step.number) ?? 0} />
                </span>
              )}
            </span>
            <div className={`flex flex-col pt-2 ${last ? "" : "pb-8"}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="type-label font-medium text-text-secondary">
                  <span className="sr-only">{step.number} </span>
                  {step.action}
                </p>
                <ValueTag kind={step.tag} />
              </div>
              <p className="mt-2 type-title text-text">{step.title}</p>
              <p className="mt-1 type-body text-text-secondary">{step.text}</p>
              {step.from.length > 0 && <p className="sr-only">{basedOn(step)}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The Evidence chain's steps (DESIGN.md, Evidence chain) and their flow: a
 * comb from 1024px, a list below it, and a button in the section header that
 * pauses and plays the flow. The flow runs only while the section is in view
 * (components/Reveal.tsx). `children` is the section's heading and lead.
 */
export function EvidenceFlow({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-reveal="flow" data-paused={paused ? "" : undefined} className="mx-auto flex max-w-6xl flex-col gap-12">
      <div data-reveal="up" className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        {children}
        <div className="flex flex-wrap items-center gap-2 self-start sm:justify-end sm:self-auto">
          <ExampleLabel>{evidenceChain.label}</ExampleLabel>
          <Button variant="ghost" size="sm" onClick={() => setPaused(!paused)} className="motion-reduce:hidden">
            {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
            {paused ? evidenceChain.play : evidenceChain.pause}
          </Button>
        </div>
      </div>

      <Comb />
      <List />
    </div>
  );
}
