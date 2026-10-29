import type { problem } from "@/content/site";

type Source = (typeof problem.panels)[number]["source"];

// Line drawings of the four kinds of building data in the Problem section.
// CONTENT.md: simple line illustrations, with no numbers, error states or
// statistics, so any text is drawn as plain bars.
const line = "stroke-text-secondary/70";
const faint = "stroke-text-secondary/30";
const bar = "fill-text-secondary/25";

function Drawing({ source }: { source: Source }) {
  switch (source) {
    // A boiler, with the camera's focus on its nameplate.
    case "photos":
      return (
        <>
          <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="76" y="28" width="72" height="70" rx="6" className={line} />
            <path d="M94 28V12M88 12h12M130 28V12M124 12h12" className={line} />
            <circle cx="112" cy="42" r="6" className={line} />
            <path d="M112 42l3.5-3.5" className={line} />
            <path d="M68 98h88" className={faint} />
            <rect x="94" y="60" width="36" height="22" rx="2" className={line} />
            <path d="M88 60v-6h6M130 54h6v6M136 82v6h-6M94 88h-6v-6" className="stroke-brand/70" />
          </g>
          <rect x="99" y="66" width="20" height="3" rx="1.5" className={bar} />
          <rect x="99" y="73" width="14" height="3" rx="1.5" className={bar} />
        </>
      );
    // Statements from more than one account, one with its usage over time.
    case "bills":
      return (
        <>
          <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="64" y="16" width="72" height="88" rx="4" className={faint} />
            <path d="M100 12a4 4 0 0 1 4-4h56l16 16v76a4 4 0 0 1-4 4h-68a4 4 0 0 1-4-4z" className={`fill-bg-alt ${line}`} />
            <path d="M160 8v12a4 4 0 0 0 4 4h12" className={line} />
            <path d="M110 92h56" className={faint} />
            <path d="M110 86l10-8 10 4 10-12 10 4 16-12" className="stroke-brand/70" />
          </g>
          <rect x="110" y="24" width="32" height="3" rx="1.5" className={bar} />
          <rect x="110" y="32" width="48" height="3" rx="1.5" className={bar} />
          <rect x="110" y="40" width="40" height="3" rx="1.5" className={bar} />
        </>
      );
    // A nameplate screwed to the equipment, with its cut sheet behind.
    case "records":
      return (
        <>
          <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="140" y="10" width="64" height="84" rx="3" className={faint} />
            <rect x="36" y="22" width="132" height="72" rx="4" className={`fill-bg-alt ${line}`} />
            <circle cx="44" cy="30" r="2.5" className={line} />
            <circle cx="160" cy="30" r="2.5" className={line} />
            <circle cx="44" cy="86" r="2.5" className={line} />
            <circle cx="160" cy="86" r="2.5" className={line} />
          </g>
          <rect x="174" y="20" width="22" height="3" rx="1.5" className={bar} />
          <rect x="174" y="28" width="16" height="3" rx="1.5" className={bar} />
          <rect x="56" y="36" width="24" height="3" rx="1.5" className={bar} />
          <rect x="88" y="36" width="56" height="3" rx="1.5" className={bar} />
          <rect x="56" y="48" width="20" height="3" rx="1.5" className={bar} />
          <rect x="88" y="48" width="44" height="3" rx="1.5" className={bar} />
          <rect x="56" y="60" width="28" height="3" rx="1.5" className={bar} />
          <rect x="88" y="60" width="50" height="3" rx="1.5" className="fill-brand/50" />
          <rect x="56" y="76" width="64" height="3" rx="1.5" className={bar} />
        </>
      );
    // A spreadsheet, and a report kept in another file.
    case "spreadsheets":
      return (
        <>
          <rect x="33" y="13" width="126" height="14" className="fill-text-secondary/10" />
          <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <rect x="32" y="12" width="128" height="88" rx="3" className={line} />
            <path d="M32 28h128M32 46h128M32 64h128M32 82h128M64 12v88M96 12v88M128 12v88" className={faint} />
            <path d="M148 34a3 3 0 0 1 3-3h40l14 14v52a3 3 0 0 1-3 3h-51a3 3 0 0 1-3-3z" className={`fill-bg-alt ${line}`} />
            <path d="M191 31v11a3 3 0 0 0 3 3h11" className={line} />
          </g>
          <rect x="40" y="35" width="16" height="3" rx="1.5" className={bar} />
          <rect x="72" y="35" width="12" height="3" rx="1.5" className={bar} />
          <rect x="104" y="53" width="16" height="3" rx="1.5" className={bar} />
          <rect x="40" y="71" width="12" height="3" rx="1.5" className={bar} />
          <rect x="72" y="89" width="16" height="3" rx="1.5" className={bar} />
          <rect x="156" y="40" width="24" height="3" rx="1.5" className={bar} />
          <rect x="158" y="72" width="6" height="16" rx="1" className="fill-brand/50" />
          <rect x="168" y="64" width="6" height="24" rx="1" className="fill-brand/50" />
          <rect x="178" y="76" width="6" height="12" rx="1" className="fill-brand/50" />
        </>
      );
  }
}

/** The panel in a Problem card: a line drawing of the card's kind of data. */
export function SourceIllustration({ source }: { source: Source }) {
  return (
    <div className="relative rounded-container border border-divider bg-bg-alt p-5">
      {source === "photos" && (
        // A camera's viewfinder corners, as in Stitch.
        <>
          <span aria-hidden className="absolute top-2 left-2 size-1.5 border-t-2 border-l-2 border-brand/70" />
          <span aria-hidden className="absolute top-2 right-2 size-1.5 border-t-2 border-r-2 border-brand/70" />
          <span aria-hidden className="absolute bottom-2 left-2 size-1.5 border-b-2 border-l-2 border-brand/70" />
          <span aria-hidden className="absolute right-2 bottom-2 size-1.5 border-r-2 border-b-2 border-brand/70" />
        </>
      )}
      <svg viewBox="0 0 240 112" aria-hidden="true" focusable="false" className="mx-auto h-28 w-auto max-w-full">
        <Drawing source={source} />
      </svg>
    </div>
  );
}
