"use client";

import { site } from "@/config/site";
import { useServerStatus } from "@/hooks/useServerStatus";
import { cn, formatNumber, playersWord } from "@/lib/format";
import type { OnlinePlayer } from "@/lib/server-status/types";
import { MockTag } from "@/components/ui/StatusBadge";

const stateLabel = { online: "Онлайн", offline: "Офлайн", unknown: "Нет данных" } as const;

export function LiveStatus() {
  const { status, loading } = useServerStatus();
  const players = status?.players;
  const fill = players && players.max > 0 ? Math.min(100, (players.online / players.max) * 100) : 0;
  const online = status?.state === "online";

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[var(--radius-card)] bg-ink p-6 text-white sm:p-10" aria-busy={loading}>
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm font-medium text-white/70">
            <span className={cn("size-2 rounded-full", online ? "status-dot-live bg-accent" : status?.state === "offline" ? "bg-danger" : "bg-white/30")} />
            {loading ? "Проверяем…" : stateLabel[status?.state ?? "unknown"]}
          </p>
          {status?.source === "mock" && <MockTag />}
        </div>

        <div className="mt-12 flex items-end gap-3 sm:mt-20">
          <p className="text-7xl leading-none font-semibold tracking-[-0.05em] tabular-nums sm:text-[112px]">
            {loading ? "—" : online && players ? formatNumber(players.online) : "0"}
          </p>
          {online && players && (
            <p className="pb-2 text-lg text-white/50 sm:pb-4">
              {playersWord(players.online)} из {formatNumber(players.max)}
            </p>
          )}
        </div>

        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out" style={{ width: `${fill}%` }} />
        </div>
        {!loading && !online && (
          <p className="mt-6 text-[15px] text-white/60">
            {status?.state === "offline"
              ? "Сервер сейчас недоступен — возможно, идут технические работы. Анонсы — в Discord."
              : "Не удалось получить статус. Данные обновятся автоматически."}
          </p>
        )}
      </div>

      <div className="rounded-[var(--radius-card)] border border-line p-6 sm:p-10">
        <dl className="divide-y divide-line">
          <Row label="Версия" value={status?.version ?? site.server.version} />
          <Row label="Адрес" value={site.server.address} mono />
          <Row label="Слоты" value={players ? formatNumber(players.max) : "—"} />
          <Row
            label="Обновлено"
            value={status ? new Date(status.fetchedAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) : "—"}
          />
        </dl>
      </div>

      <div className="lg:col-span-2">
        <PlayerList players={players?.list ?? []} online={online} count={players?.online ?? 0} />
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <dt className="text-[15px] text-muted">{label}</dt>
      <dd className={cn("truncate text-right text-[15px] font-medium", mono && "font-mono")}>{value}</dd>
    </div>
  );
}

function PlayerList({ players, online, count }: { players: OnlinePlayer[]; online: boolean; count: number }) {
  if (!online) return null;
  return (
    <div className="rounded-[var(--radius-card)] bg-surface p-6 sm:p-10">
      <h3 className="text-sm font-medium text-muted">Сейчас в игре</h3>
      {count === 0 ? (
        <p className="mt-4 text-[15px] text-ink-2">Пока никого. Самое время стать первым.</p>
      ) : players.length === 0 ? (
        <p className="mt-4 text-[15px] text-ink-2">Список игроков скрыт настройками сервера.</p>
      ) : (
        <ul className="mt-6 flex flex-wrap gap-2">
          {players.map((p) => (
            <li key={p.uuid ?? p.name} className="flex items-center gap-2.5 rounded-full bg-canvas py-1.5 pr-4 pl-1.5 transition-shadow hover:shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc-heads.net/avatar/${encodeURIComponent(p.uuid ?? p.name)}/64`}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className="size-7 rounded-full bg-surface-2 [image-rendering:pixelated]"
              />
              <span className="text-[15px] font-medium">{p.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
