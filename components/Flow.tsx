import { hexagon } from "@/components/Honeycomb";

/**
 * Pieces shared by the flows (DESIGN.md, Motion): the Evidence chain's loop
 * and the Problem hub's single pass. Both draw dotted connectors with the
 * same dots, ports and trains, and hexagon outlines stretched over boxes of
 * the same proportions.
 */

/** A regular pointy-top hexagon's outline in a 0 0 HEX_WIDTH 1000 box: a box of its width and height. */
export const HEX_WIDTH = Math.sqrt(3) * 500;
export const hexOutline = hexagon(HEX_WIDTH / 2, 500, 500);

/** A connector's dots: 2px, 6px apart. */
const dots = { fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeDasharray: "0 6" } as const;

type FlowTrackProps = {
  /** Ports, 6px dots, at the track's start (top), end (bottom), or both. */
  ports?: ("start" | "end")[];
  /** Classes for the dotted line and the ports, such as their lit states. */
  lineClassName?: string;
  portClassName?: string;
  /** Classes for the train, such as its stage in the Evidence chain's cycle. */
  trainClassName?: string;
};

/**
 * A dotted line down its box, and the train of three dots that crosses it,
 * clipped to the box (app/globals.css, flow-track and flow-train). A
 * connector turns its box to point its way. The CSS of each flow decides
 * when the train moves.
 */
export function FlowTrack({ ports = [], lineClassName = "", portClassName = "", trainClassName = "" }: FlowTrackProps) {
  return (
    <>
      <svg aria-hidden="true" focusable="false" className="absolute inset-0 size-full overflow-visible">
        <line x1="50%" y1="0" x2="50%" y2="100%" {...dots} className={`stroke-chip-border ${lineClassName}`} />
        {ports.map((end) => (
          <circle
            key={end}
            data-port=""
            cx="50%"
            cy={end === "start" ? "0" : "100%"}
            r={3}
            className={`fill-chip-border ${portClassName}`}
          />
        ))}
      </svg>
      <span className="flow-track">
        <span className={`flow-train ${trainClassName}`}>
          <span className="flow-dot size-1 opacity-50" />
          <span className="flow-dot size-[5px] opacity-75" />
          <span className="flow-dot size-1.5" />
        </span>
      </span>
    </>
  );
}
