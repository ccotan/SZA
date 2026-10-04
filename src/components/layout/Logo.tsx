import Link from "next/link";
import { site } from "@/config/site";

/** Знак — блок из 4 клеток, один акцентный. Простой, масштабируемый, без пиксель-арта. */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — на главную`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect x="0" y="0" width="12" height="12" rx="3" fill={inverse ? "#fff" : "#0c110e"} />
        <rect x="14" y="0" width="12" height="12" rx="3" fill={inverse ? "#fff" : "#0c110e"} opacity="0.35" />
        <rect x="0" y="14" width="12" height="12" rx="3" fill={inverse ? "#fff" : "#0c110e"} opacity="0.35" />
        <rect x="14" y="14" width="12" height="12" rx="3" fill="#13a04c" />
      </svg>
      <span className={`text-[17px] font-semibold tracking-[-0.02em] ${inverse ? "text-white" : "text-ink"}`}>{site.name}</span>
    </Link>
  );
}
