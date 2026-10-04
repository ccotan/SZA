/**
 * ТОЛЬКО ДЛЯ РАЗРАБОТКИ. Включается через STATUS_PROVIDER=mock.
 * Ответ помечен source: "mock", и интерфейс явно показывает плашку «Тестовые данные».
 */
import type { StatusProvider } from "./types";

const names = ["Steve", "Alex", "Notch", "jeb_", "Dinnerbone"];

export const mockProvider: StatusProvider = {
  async getStatus(address) {
    return {
      state: "online",
      address,
      version: "1.21.4",
      motd: "Mock server",
      players: { online: names.length, max: 50, list: names.map((name) => ({ name })) },
      fetchedAt: new Date().toISOString(),
      source: "mock",
    };
  },
};
