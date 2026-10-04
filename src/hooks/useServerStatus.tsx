"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { ServerStatus } from "@/lib/server-status/types";
import { site } from "@/config/site";

type StatusContextValue = { status: ServerStatus | null; loading: boolean; refresh: () => void };

const StatusContext = createContext<StatusContextValue | null>(null);

/** Один опрос API на всё приложение — hero, блок онлайна и мобильная панель читают один источник */
export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setStatus((await res.json()) as ServerStatus);
    } catch {
      setStatus((prev) => prev ?? {
        state: "unknown",
        address: site.server.address,
        version: null,
        motd: null,
        players: null,
        fetchedAt: new Date().toISOString(),
        source: "live",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const tick = () => document.visibilityState === "visible" && void refresh();
    const id = window.setInterval(tick, site.statusPollInterval);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [refresh]);

  return <StatusContext.Provider value={{ status, loading, refresh }}>{children}</StatusContext.Provider>;
}

export function useServerStatus() {
  const ctx = useContext(StatusContext);
  if (!ctx) throw new Error("useServerStatus must be used inside ServerStatusProvider");
  return ctx;
}
