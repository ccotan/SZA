"use client";

import { useServerStatus } from "@/hooks/useServerStatus";
import { formatNumber, playersWord, cn } from "@/lib/format";

/** Компактный live-статус: точка, состояние, онлайн, версия */
export function StatusBadge({ className, showVersion = true }: { className?: string; showVersion?: boolean }) {
  const { status, loading } = useServerStatus();

  if (loading || !status) {
    return (
      <div className={cn("flex items-center gap-2.5 text-sm text-muted", className)} aria-busy="true">
        <span className="size-2 rounded-full bg-muted/40" />
        Проверяем сервер…
      </div>
    );
  }

  const online = status.state === "online";
  const label = online ? "Сервер онлайн" : status.state === "offline" ? "Сервер офлайн" : "Статус недоступен";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm", className)} role="status">
      <span className="flex items-center gap-2 font-medium text-ink">
        <span className={cn("size-2 rounded-full", online ? "status-dot-live bg-accent" : status.state === "offline" ? "bg-danger" : "bg-muted/50")} />
        {label}
      </span>
      {online && status.players && (
        <span className="text-ink-2">
          <span className="font-semibold tabular-nums">{formatNumber(status.players.online)}</span> {playersWord(status.players.online)}
        </span>
      )}
      {showVersion && online && status.version && <span className="text-muted">{status.version}</span>}
      {status.source === "mock" && <MockTag />}
    </div>
  );
}

export function MockTag() {
  return (
    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800" title="Включён STATUS_PROVIDER=mock">
      Тестовые данные
    </span>
  );
}
