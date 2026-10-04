"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-[-0.01em] sm:text-xl"
              >
                <span className="transition-colors group-hover:text-ink-2">{item.q}</span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-45 bg-ink text-white" : "bg-surface text-ink group-hover:bg-surface-2",
                  )}
                >
                  <Icon name="plus" size={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              inert={!isOpen}
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-base leading-relaxed text-muted sm:text-[17px]">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
