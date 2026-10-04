export type ServerState = "online" | "offline" | "unknown";

export type OnlinePlayer = { name: string; uuid?: string };

export type ServerStatus = {
  state: ServerState;
  address: string;
  version: string | null;
  motd: string | null;
  players: { online: number; max: number; list: OnlinePlayer[] } | null;
  /** ISO-время получения данных */
  fetchedAt: string;
  /** "live" — реальные данные; "mock" — тестовые, никогда не показывать как настоящие */
  source: "live" | "mock";
};

/** Любой источник статуса (mcsrvstat, собственный плагин, RCON-прокси) реализует этот интерфейс */
export interface StatusProvider {
  getStatus(address: string): Promise<ServerStatus>;
}
