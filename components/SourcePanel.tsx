import { ImageIcon, ScanLine } from "lucide-react";
import { Panel } from "@/components/Panel";
import { StatusChip } from "@/components/Chip";
import { problem } from "@/content/site";

type Source = (typeof problem.panels)[number]["source"];

const { photos, bills, records, spreadsheets } = problem.examples;
const line = "stroke-text-secondary/70";
const faint = "stroke-text-secondary/30";

/** A boiler, with the camera's focus on its nameplate: a line drawing, so no real photo. */
function Boiler() {
  return (
    <svg viewBox="60 4 104 100" aria-hidden="true" focusable="false" className="mx-auto h-24 w-auto">
      <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="76" y="28" width="72" height="70" rx="6" className={line} />
        <path d="M94 28V12M88 12h12M130 28V12M124 12h12" className={line} />
        <circle cx="112" cy="42" r="6" className={line} />
        <path d="M112 42l3.5-3.5" className={line} />
        <path d="M68 98h88" className={faint} />
        <rect x="94" y="60" width="36" height="22" rx="2" className={line} />
        <path d="M88 60v-6h6M130 54h6v6M136 82v6h-6M94 88h-6v-6" className="stroke-brand/70" />
      </g>
      <rect x="99" y="66" width="20" height="3" rx="1.5" className="fill-text-secondary/25" />
      <rect x="99" y="73" width="14" height="3" rx="1.5" className="fill-text-secondary/25" />
    </svg>
  );
}

/** A camera's viewfinder, as in Stitch: corner reticles around a photo of a boiler, and the photo's tags. */
function PhotoPanel() {
  return (
    <div className="relative flex flex-1 flex-col justify-between gap-3 rounded-container border border-divider bg-bg-alt p-5">
      <span aria-hidden className="absolute top-2 left-2 size-1.5 border-t-2 border-l-2 border-brand/70" />
      <span aria-hidden className="absolute top-2 right-2 size-1.5 border-t-2 border-r-2 border-brand/70" />
      <span aria-hidden className="absolute bottom-2 left-2 size-1.5 border-b-2 border-l-2 border-brand/70" />
      <span aria-hidden className="absolute right-2 bottom-2 size-1.5 border-r-2 border-b-2 border-brand/70" />
      <p className="flex items-center gap-2 type-label text-text-secondary">
        <ImageIcon size={14} aria-hidden className="shrink-0" />
        {photos.photo}
      </p>
      <Boiler />
      <p className="flex items-center gap-2 rounded-tile border border-dashed border-divider bg-bg p-2.5 type-label text-text-soft">
        <ScanLine size={14} aria-hidden className="shrink-0 text-brand" />
        {photos.equipment}
      </p>
    </div>
  );
}

// A year of gas use, one statement a month: high in winter, low in summer.
// The heights are drawn only; the panel shows no figures. July's statement is
// missing.
const months = [8, 10, 16, 24, 30, 33, null, 33, 28, 20, 13, 9];
const missing = months.indexOf(null);
/** Each month sits in the middle of its twelfth of the width, over its tick. */
const point = (index: number) => `${index * 10 + 5} ${months[index]}`;
const run = (from: number, to: number) =>
  `M${Array.from({ length: to - from + 1 }, (_, offset) => point(from + offset)).join("L")}`;
const dots = months.map((value, index) => (value === null ? "" : `M${point(index)}h0`)).join("");

/** A gas account's year of statements, with one statement missing. */
function BillPanel() {
  return (
    <Panel label={bills.account} className="flex flex-1 flex-col">
      {/* Stretched to the panel, with strokes and dots kept at their size. */}
      <svg
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="h-16 w-full flex-1 overflow-visible"
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d={`${run(0, missing - 1)}${run(missing + 1, months.length - 1)}`}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className={line}
          />
          <path
            d={`M${point(missing - 1)}L${point(missing + 1)}`}
            strokeWidth={1.5}
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            className="stroke-warning"
          />
          <path d={dots} strokeWidth={5} vectorEffect="non-scaling-stroke" className="stroke-brand/80" />
        </g>
      </svg>
      <div aria-hidden className="mt-2 grid grid-cols-12 border-t border-divider/60 pt-1.5">
        {months.map((value, index) => (
          <span key={index} className="flex justify-center">
            <span className={`h-1.5 border-l ${value === null ? "border-dashed border-warning" : "border-divider"}`} />
          </span>
        ))}
      </div>
      {/* Under July: a dashed mark and the words, so the colour is not the only signal. */}
      <div className="grid grid-cols-12">
        <p className="col-start-7 flex items-center gap-2 justify-self-center type-label whitespace-nowrap text-warning">
          <span aria-hidden className="w-4 border-t-2 border-dashed border-warning" />
          {bills.gap}
        </p>
      </div>
    </Panel>
  );
}

/** A submittal for a boiler: its ratings, and a service log kept on paper. */
function RecordPanel() {
  return (
    <Panel label={records.title} className="flex flex-1 flex-col">
      <dl className="grid flex-1 grid-cols-2 content-center gap-3 rounded-tile border border-divider/60 bg-bg p-3">
        {records.fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-0.5">
            <dt className="type-label text-text-secondary">{field.label}</dt>
            <dd className={`type-label ${"severity" in field ? "text-warning" : "text-text-soft"}`}>{field.value}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

/** Rows of a spreadsheet: what each cell holds, its formula, and what is wrong with it. */
function SpreadsheetPanel() {
  return (
    <Panel className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col justify-between divide-y divide-divider/60">
        {spreadsheets.rows.map((row) => (
          <li
            key={row.metric}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 py-2.5 first:pt-0 last:pb-0"
          >
            <span className="type-label text-text-soft">{row.metric}</span>
            <StatusChip severity={row.severity}>{row.status}</StatusChip>
            <code className="col-span-2 type-label text-text-secondary">{row.formula}</code>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** The example in a Problem card: one source of building data, as it arrives today. */
export function SourcePanel({ source }: { source: Source }) {
  switch (source) {
    case "photos":
      return <PhotoPanel />;
    case "bills":
      return <BillPanel />;
    case "records":
      return <RecordPanel />;
    case "spreadsheets":
      return <SpreadsheetPanel />;
  }
}
