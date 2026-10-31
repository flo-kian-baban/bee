"use client";

import {
  Calculator,
  Camera,
  ClipboardList,
  type LucideIcon,
  Receipt,
  ScanText,
  ThermometerSnowflake,
  UserPen,
} from "lucide-react";
import { type KeyboardEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { hexagon } from "@/components/Honeycomb";
import { ValueTag } from "@/components/ValueTag";
import { evidenceChain, type StepNumber } from "@/content/site";

const { steps } = evidenceChain;
const byNumber = new Map(steps.map((step) => [step.number, step]));
const LAST = steps[steps.length - 1].number;

// One icon per step.
const icons: Record<StepNumber, LucideIcon> = {
  "01": Camera,
  "02": ScanText,
  "03": Receipt,
  "04": ThermometerSnowflake,
  "05": UserPen,
  "06": Calculator,
  "07": ClipboardList,
};

/** Every step a step is worked out from, directly or through others, in step order. */
function trailOf(number: StepNumber) {
  const earlier = new Set<StepNumber>();
  const visit = (step: StepNumber) => {
    for (const input of byNumber.get(step)?.from ?? []) {
      earlier.add(input);
      visit(input);
    }
  };
  visit(number);
  return steps.map((step) => step.number).filter((step) => earlier.has(step));
}

/** How many connectors the trace crosses to reach a step: none for a step that starts a stream. */
function depthOf(number: StepNumber): number {
  const inputs = byNumber.get(number)?.from ?? [];
  return inputs.length ? 1 + Math.max(...inputs.map(depthOf)) : 0;
}

const trails = new Map(steps.map((step) => [step.number, trailOf(step.number)]));
const depths = new Map(steps.map((step) => [step.number, depthOf(step.number)]));

// When the trace reaches a step, or the far end of a connector: after this
// many connectors (app/globals.css, trace).
const traceStep = ["[--trace-step:0]", "[--trace-step:1]", "[--trace-step:2]", "[--trace-step:3]"];

type Connector = { from: StepNumber; to: StepNumber; key: string };

/** One connector per input, from the earlier step to the later. */
const connectors: Connector[] = steps.flatMap((step) =>
  step.from.map((from) => ({ from, to: step.number, key: `${from}-${step.number}` })),
);

const round = (value: number) => Math.round(value * 100) / 100;

// The comb, from 768px: cells CELL wide and GAP apart, as --comb-cell and
// --comb-gap in styles/tokens.css, which place the cells. Neighbours' centres
// are a pitch apart; rows are a pitch × √3/2 apart.
const CELL = 200;
const GAP = 56;
const PITCH = CELL + GAP;
const ROW = (PITCH * Math.sqrt(3)) / 2;
const CORNER = CELL / Math.sqrt(3);
const COMB_WIDTH = 3 * CELL + 2 * GAP;
const COMB_HEIGHT = round(2 * CORNER + 2 * ROW);

// Each step's place: 01 and 02 above 06, 05 and 07 beside it, 03 and 04 below.
// Columns are half a pitch apart. The class gives the same place to CSS.
const places: Record<StepNumber, { col: number; row: number; className: string }> = {
  "01": { col: 1, row: 0, className: "[--comb-col:1] [--comb-row:0]" },
  "02": { col: 3, row: 0, className: "[--comb-col:3] [--comb-row:0]" },
  "03": { col: 1, row: 2, className: "[--comb-col:1] [--comb-row:2]" },
  "04": { col: 3, row: 2, className: "[--comb-col:3] [--comb-row:2]" },
  "05": { col: 0, row: 1, className: "[--comb-col:0] [--comb-row:1]" },
  "06": { col: 2, row: 1, className: "[--comb-col:2] [--comb-row:1]" },
  "07": { col: 4, row: 1, className: "[--comb-col:4] [--comb-row:1]" },
};

const centre = (number: StepNumber) => ({
  x: CELL / 2 + (places[number].col * PITCH) / 2,
  y: CORNER + places[number].row * ROW,
});

/** A comb connector joins the middles of two facing walls, half a cell from each centre. */
function combConnector({ from, to }: Connector) {
  const a = centre(from);
  const b = centre(to);
  const [ux, uy] = [(b.x - a.x) / PITCH, (b.y - a.y) / PITCH];
  const [x1, y1, x2, y2] = [a.x + (ux * CELL) / 2, a.y + (uy * CELL) / 2, b.x - (ux * CELL) / 2, b.y - (uy * CELL) / 2];
  return {
    line: `M${round(x1)} ${round(y1)}L${round(x2)} ${round(y2)}`,
    // 4px longer at each end, so the lit line's mask covers both ports.
    trail: `M${round(x1 - 4 * ux)} ${round(y1 - 4 * uy)}L${round(x2 + 4 * ux)} ${round(y2 + 4 * uy)}`,
    ports: [
      [round(x1), round(y1)],
      [round(x2), round(y2)],
    ] as [number, number][],
  };
}

// A cell's and a badge's outline, stretched over its box, which has the same
// proportions, and the cell's focus ring: a 2px line 2px clear of its walls.
const HEX_WIDTH = Math.sqrt(3) * 500;
const outline = hexagon(HEX_WIDTH / 2, 500, 500);
const ring = hexagon(HEX_WIDTH / 2, 500, 500 * (1 + 3 / (CELL / 2)));

// Unlit: card and edge. On the trail: brand at 60%. The selected step: a 2px
// brand line over brand at 6%.
const outlineClass =
  "trace-outline fill-card stroke-edge transition-colors duration-200 group-data-lit:stroke-brand/60 group-aria-[current=step]:fill-[color-mix(in_srgb,var(--color-brand)_6%,var(--color-card))] group-aria-[current=step]:stroke-brand group-aria-[current=step]:stroke-2";
const inkClass = "trace-ink text-text-secondary transition-colors duration-200 group-data-lit:text-brand";

type Box = { x: number; y: number; width: number; height: number };

// Below 768px, a connector that passes other steps runs down a lane left of the
// rail: the outer lane into the badge's left wall, the inner one square to its
// upper-left wall. The others run down the rail.
const lanes: Partial<Record<string, "outer" | "inner">> = { "02-06": "outer", "04-06": "inner" };

function listConnector({ from, to, key }: Connector, badges: Record<StepNumber, Box>) {
  const a = badges[from];
  const b = badges[to];
  const lane = lanes[key];
  if (!lane) {
    // From one badge's bottom corner to the next one's top corner.
    const x = round(a.x + a.width / 2);
    return `M${x} ${round(a.y + a.height)}V${round(b.y)}`;
  }
  const radius = 8;
  const x = round(a.x - (lane === "outer" ? 24 : 12));
  const y = round(a.y + a.height / 2);
  const start = `M${round(a.x)} ${y}H${x + radius}Q${x} ${y} ${x} ${y + radius}`;
  if (lane === "outer") {
    const end = round(b.y + b.height / 2);
    return `${start}V${end - radius}Q${x} ${end} ${x + radius} ${end}H${round(b.x)}`;
  }
  const wall = { x: b.x + b.width / 4, y: b.y + b.height / 8 };
  return `${start}V${round(wall.y - Math.sqrt(3) * (wall.x - x))}L${round(wall.x)} ${round(wall.y)}`;
}

type ConnectorLineProps = {
  id: string;
  /** Its steps, "from-to". */
  name: string;
  line: string;
  /** The path that reveals the lit line as the dot travels. */
  trail: string;
  ports?: [number, number][];
  lit: boolean;
  /** How many connectors the trace has crossed when it reaches the far end. */
  step: number;
  width: number;
  height: number;
};

/** A dotted connector, unlit or lit; while the trace runs, a dot lights it from end to end. */
function ConnectorLine({ id, name, line, trail, ports = [], lit, step, width, height }: ConnectorLineProps) {
  const dots = { fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeDasharray: "0 6" } as const;
  return (
    <g data-connector={name} data-lit={lit ? "" : undefined} className={traceStep[step]}>
      <path d={line} {...dots} className="stroke-chip-border" />
      {ports.map(([x, y]) => (
        <circle key={`${x},${y}`} cx={x} cy={y} r={3} className="fill-chip-border" />
      ))}
      {lit && (
        <>
          <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={width} height={height}>
            <path d={trail} fill="none" strokeWidth={10} pathLength={1} className="trace-trail draw-stroke stroke-text" />
          </mask>
          <g mask={`url(#${id})`}>
            <path d={line} {...dots} className="stroke-brand/80" />
            {ports.map(([x, y]) => (
              <circle key={`${x},${y}`} cx={x} cy={y} r={3} className="fill-brand" />
            ))}
          </g>
          <path
            d={line}
            fill="none"
            strokeWidth={6}
            strokeLinecap="round"
            pathLength={1}
            className="trace-dot stroke-brand"
          />
        </>
      )}
    </g>
  );
}

// Arrow keys move between the steps in order; Home and End go to the first and last.
const moves: Record<string, (index: number) => number> = {
  ArrowRight: (index) => index + 1,
  ArrowDown: (index) => index + 1,
  ArrowLeft: (index) => index - 1,
  ArrowUp: (index) => index - 1,
  Home: () => 0,
  End: () => steps.length - 1,
};

/**
 * The Evidence chain's steps and detail panel (DESIGN.md, Evidence chain).
 * From 768px the steps are cells of a comb, below it a list on a rail. The
 * trace runs once as the comb comes into view (app/globals.css) and ends on
 * 07; hovering, focusing or tapping a step replays it up to that step and
 * shows the step in the panel.
 */
export function EvidenceTrace() {
  const [selected, setSelected] = useState<StepNumber>(LAST);
  const [run, setRun] = useState(0);
  const [list, setList] = useState<{ width: number; height: number; paths: Record<string, string> } | null>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const badges = useRef<(HTMLSpanElement | null)[]>([]);
  const last = useRef({ number: LAST, at: -Infinity });

  const lit = new Set([...(trails.get(selected) ?? []), selected]);

  const traceTo = useCallback((number: StepNumber) => {
    const now = performance.now();
    // A click or tap brings focus and a click at once, often just after a hover: replay once.
    if (number === last.current.number && now - last.current.at < 400) return;
    last.current = { number, at: now };
    setSelected(number);
    setRun((count) => count + 1);
  }, []);

  // Each replay restarts the trace: its animations stop while data-run is
  // "reset", and start again from the beginning when it turns to "go".
  useLayoutEffect(() => {
    const trace = traceRef.current;
    if (!run || !trace) return;
    trace.setAttribute("data-run", "reset");
    trace.getBoundingClientRect();
    trace.setAttribute("data-run", "go");
  }, [run]);

  // Below 768px the rail and lanes join the badges wherever the list puts them.
  useLayoutEffect(() => {
    const trace = traceRef.current;
    if (!trace) return;
    const measure = () => {
      const origin = trace.getBoundingClientRect();
      const boxes: Partial<Record<StepNumber, Box>> = {};
      for (const [index, step] of steps.entries()) {
        const badge = badges.current[index]?.getBoundingClientRect();
        // From 768px the badges are hidden, and the comb draws its own connectors.
        if (!badge?.width) {
          setList(null);
          return;
        }
        boxes[step.number] = {
          x: badge.left - origin.left,
          y: badge.top - origin.top,
          width: badge.width,
          height: badge.height,
        };
      }
      const placed = boxes as Record<StepNumber, Box>;
      setList({
        width: round(origin.width),
        height: round(origin.height),
        paths: Object.fromEntries(connectors.map((connector) => [connector.key, listConnector(connector, placed)])),
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(trace);
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    buttons.current[move(index)]?.focus();
  }

  return (
    <div className="@container">
      <div className="flex flex-col items-center gap-10 @min-[67rem]:flex-row @min-[67rem]:justify-between">
        <div ref={traceRef} data-reveal="trace" className="relative w-full md:w-auto md:shrink-0">
          <ol className="flex flex-col md:comb">
            {steps.map((step, index) => {
              const Icon = icons[step.number];
              const group = evidenceChain.groups[step.number];
              return (
                <li
                  key={step.number}
                  className={`${places[step.number].className} ${group && index > 0 ? "pt-5" : ""} md:comb-cell md:pt-0`}
                >
                  {group && <p className="pb-1 pl-19 type-label text-text-secondary md:hidden">{group}</p>}
                  <button
                    ref={(element) => {
                      buttons.current[index] = element;
                    }}
                    type="button"
                    data-lit={lit.has(step.number) ? "" : undefined}
                    aria-current={step.number === selected ? "step" : undefined}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") traceTo(step.number);
                    }}
                    onFocus={() => traceTo(step.number)}
                    onClick={() => traceTo(step.number)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={`group ${traceStep[depths.get(step.number) ?? 0]} relative grid w-full grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-3 text-left md:pointer-events-none md:flex md:size-full md:flex-col md:items-center md:justify-center md:gap-0 md:py-0 md:pb-4 md:text-center md:focus-visible:outline-none`}
                  >
                    {/* From 768px: the cell, whose hexagon alone takes the pointer, and its focus ring. */}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox={`0 0 ${HEX_WIDTH} 1000`}
                      preserveAspectRatio="none"
                      className="absolute inset-0 hidden size-full overflow-visible md:block"
                    >
                      <path d={outline} vectorEffect="non-scaling-stroke" className={`pointer-events-auto ${outlineClass}`} />
                      <path
                        d={ring}
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={2}
                        className="hidden fill-none stroke-brand group-focus-visible:inline"
                      />
                    </svg>

                    {/* Below 768px: a badge with the number, on the rail. */}
                    <span
                      ref={(element) => {
                        badges.current[index] = element;
                      }}
                      aria-hidden="true"
                      className="relative col-start-1 row-span-2 row-start-1 flex aspect-[0.8660254] w-8 items-center justify-center justify-self-end md:hidden"
                    >
                      <svg
                        focusable="false"
                        viewBox={`0 0 ${HEX_WIDTH} 1000`}
                        preserveAspectRatio="none"
                        className="absolute inset-0 size-full overflow-visible"
                      >
                        <path d={outline} vectorEffect="non-scaling-stroke" className={outlineClass} />
                      </svg>
                      <span className={`relative type-label tabular-nums ${inkClass}`}>{step.number}</span>
                    </span>

                    {/* The cell's rows have fixed heights, so every cell lines up. They sit 8px
                        above its centre, which keeps the widest tag clear of its lower walls. */}
                    <span
                      data-part="label"
                      className={`col-start-2 row-start-1 type-label font-medium md:h-4 ${inkClass}`}
                    >
                      <span className="max-md:sr-only">{step.number} </span>
                      {step.action}
                    </span>
                    <span data-part="icon" aria-hidden="true" className={`hidden md:mt-1.5 md:flex md:h-5 md:items-center ${inkClass}`}>
                      <Icon size={20} />
                    </span>
                    <span
                      data-part="title"
                      className="col-span-2 col-start-2 row-start-2 type-cell text-balance text-text md:mt-1.5 md:flex md:h-11 md:max-w-42 md:items-center md:justify-center"
                    >
                      {step.title}
                    </span>
                    <span data-part="tag" className="col-start-3 row-start-1 md:mt-1.5 md:flex md:h-5.5 md:items-center">
                      <ValueTag kind={step.tag} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <svg
            aria-hidden="true"
            focusable="false"
            data-connectors="comb"
            viewBox={`0 0 ${COMB_WIDTH} ${COMB_HEIGHT}`}
            className="pointer-events-none absolute inset-0 z-10 hidden size-full overflow-visible md:block"
          >
            {connectors.map((connector) => (
              <ConnectorLine
                key={connector.key}
                id={`evidence-comb-${connector.key}`}
                name={connector.key}
                {...combConnector(connector)}
                lit={lit.has(connector.to)}
                step={depths.get(connector.to) ?? 0}
                width={COMB_WIDTH}
                height={COMB_HEIGHT}
              />
            ))}
          </svg>

          {list && (
            <svg
              aria-hidden="true"
              focusable="false"
              data-connectors="list"
              className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible md:hidden"
            >
              {connectors.map((connector) => (
                <ConnectorLine
                  key={connector.key}
                  id={`evidence-list-${connector.key}`}
                  name={connector.key}
                  line={list.paths[connector.key]}
                  trail={list.paths[connector.key]}
                  lit={lit.has(connector.to)}
                  step={depths.get(connector.to) ?? 0}
                  width={list.width}
                  height={list.height}
                />
              ))}
            </svg>
          )}
        </div>

        <div
          data-reveal="up"
          className="w-full max-w-(--comb-width) rounded-card border border-edge bg-card p-6 shadow-xl md:p-7 @min-[67rem]:max-w-100 @min-[67rem]:flex-1"
        >
          {/* Every step's details share one place, so the panel keeps the height
              of the tallest; only the selected step's show. */}
          <div aria-live="polite" aria-atomic="true" className="grid">
            {steps.map((step) => {
              const earlier = trails.get(step.number) ?? [];
              return (
                <div
                  key={step.number}
                  className={`col-start-1 row-start-1 flex flex-col gap-4 ${step.number === selected ? "" : "invisible"}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="type-label font-medium text-brand">
                      {step.number} {step.action}
                    </p>
                    <ValueTag kind={step.tag} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="type-title text-text">{step.title}</h3>
                    <p className="type-body text-text-secondary">{step.text}</p>
                  </div>
                  <div className="flex flex-col gap-3 border-t border-divider/70 pt-4">
                    <p className="type-label text-text-secondary">{evidenceChain.basedOn}</p>
                    {earlier.length ? (
                      <ol className="flex flex-col gap-1.5">
                        {earlier.map((number) => (
                          <li key={number} className="flex items-baseline gap-3">
                            <span className="w-6 shrink-0 type-label text-text-secondary tabular-nums">{number}</span>
                            <span className="text-text-body">{byNumber.get(number)?.title}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="type-body text-text-secondary">{evidenceChain.noEarlier}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => traceTo(LAST)}>
              {evidenceChain.replay}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
