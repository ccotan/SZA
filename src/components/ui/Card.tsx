import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function Card({ children, className, tone = "surface" }: { children: ReactNode; className?: string; tone?: "surface" | "outline" | "dark" }) {
  const tones = {
    surface: "bg-surface",
    outline: "bg-canvas border border-line",
    dark: "bg-ink text-white",
  };
  return <div className={cn("rounded-[var(--radius-card)] p-6 sm:p-8", tones[tone], className)}>{children}</div>;
}
