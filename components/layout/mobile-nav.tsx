"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

export function MobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="mobile-nav-icon">
          {open ? "✕" : "☰"}
        </span>
      </button>
      <div id={panelId} className="mobile-nav-panel" data-open={open}>
        {children}
      </div>
    </div>
  );
}
