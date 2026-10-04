"use client";

import { site } from "@/config/site";
import { useCopy } from "@/hooks/useCopy";
import { cn } from "@/lib/format";
import { Icon } from "./Icon";

type Props = { variant?: "field" | "button"; className?: string; tone?: "light" | "glass" };

/** Адрес сервера + копирование. Используется в hero, онбординге и мобильной панели. */
export function CopyIp({ variant = "field", className, tone = "light" }: Props) {
  const { copied, copy } = useCopy();
  const address = site.server.address;
  const label = copied ? "IP скопирован" : "Скопировать IP";

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={() => copy(address)}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-[14px] px-5 text-[15px] font-medium transition-colors duration-200",
          copied ? "bg-accent-soft text-accent-hover" : "bg-surface text-ink hover:bg-surface-2",
          className,
        )}
      >
        <Icon name={copied ? "check" : "copy"} size={17} />
        <span aria-live="polite">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => copy(address)}
      aria-label={`${label}: ${address}`}
      className={cn(
        "group flex h-12 w-full min-w-0 items-center justify-between gap-3 rounded-[14px] pr-1.5 pl-4 text-left transition-colors duration-200",
        tone === "glass" ? "bg-white/70 backdrop-blur-md hover:bg-white/90" : "border border-line bg-canvas hover:border-ink/15",
        className,
      )}
    >
      <span className="truncate font-mono text-[15px] tracking-tight text-ink">{address}</span>
      <span
        className={cn(
          "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] px-3 text-sm font-medium transition-colors duration-200",
          copied ? "bg-accent text-white" : "bg-ink text-white group-hover:bg-ink-2",
        )}
      >
        <Icon name={copied ? "check" : "copy"} size={15} />
        <span aria-live="polite">{copied ? "Скопирован" : "Копировать"}</span>
      </span>
    </button>
  );
}
