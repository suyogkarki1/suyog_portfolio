import { Fragment, type ReactNode } from "react";

/** Splits on **bold** markers and renders them as <b>, everything else as plain text. */
export function renderBold(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>
  );
}
