import type { ServerStatus, StatusProvider } from "./types";

type McsrvstatResponse = {
  online: boolean;
  version?: string;
  motd?: { clean?: string[] };
  players?: { online: number; max: number; list?: { name: string; uuid?: string }[] };
};

/** Публичный API https://api.mcsrvstat.us — кэширует ответы ~1 минуту на своей стороне */
export const mcsrvstatProvider: StatusProvider = {
  async getStatus(address) {
    const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`, {
      headers: { "User-Agent": "valley-site/1.0" },
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`mcsrvstat responded ${res.status}`);
    const data = (await res.json()) as McsrvstatResponse;

    const status: ServerStatus = {
      state: data.online ? "online" : "offline",
      address,
      version: data.version ?? null,
      motd: data.motd?.clean?.join(" ").trim() || null,
      players: data.players
        ? { online: data.players.online, max: data.players.max, list: data.players.list ?? [] }
        : null,
      fetchedAt: new Date().toISOString(),
      source: "live",
    };
    return status;
  },
};
