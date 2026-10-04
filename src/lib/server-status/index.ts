import "server-only";
import { mcsrvstatProvider } from "./mcsrvstat";
import { mockProvider } from "./mock";
import type { ServerStatus, StatusProvider } from "./types";

export type { ServerStatus, OnlinePlayer, ServerState } from "./types";

function resolveProvider(): StatusProvider {
  if (process.env.STATUS_PROVIDER === "mock") {
    if (process.env.NODE_ENV === "production") {
      console.warn("[status] mock provider is disabled in production, falling back to live");
      return mcsrvstatProvider;
    }
    return mockProvider;
  }
  return mcsrvstatProvider;
}

export async function getServerStatus(address: string): Promise<ServerStatus> {
  try {
    return await resolveProvider().getStatus(address);
  } catch (error) {
    console.error("[status] failed to fetch", error);
    return {
      state: "unknown",
      address,
      version: null,
      motd: null,
      players: null,
      fetchedAt: new Date().toISOString(),
      source: "live",
    };
  }
}
