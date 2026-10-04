/**
 * Единый источник правды о сервере.
 * Всё, что может поменяться (адрес, версия, ссылки), задаётся здесь или через env.
 * Значения с пометкой TODO нужно подтвердить перед запуском.
 */
export const site = {
  /** TODO: рабочее название — замените на настоящее */
  name: "Valley",
  tagline: "Твой мир. Твои правила.",
  description:
    "Ванильный Minecraft-сервер без лишнего. Никаких приватов, магазинов и телепортов — только общий мир, который игроки строят вместе.",
  url: "https://valley.example",

  server: {
    /** Адрес для подключения. Задаётся через NEXT_PUBLIC_SERVER_ADDRESS */
    address: process.env.NEXT_PUBLIC_SERVER_ADDRESS ?? "play.valley.example",
    /** Версия по умолчанию — показывается, пока не пришёл живой статус */
    version: "1.21.x",
    edition: "Java Edition",
  },

  links: {
    discordInvite: process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "",
    mapUrl: process.env.NEXT_PUBLIC_MAP_URL ?? "",
    contactEmail: "",
  },

  /** Интервал опроса статуса на клиенте, мс */
  statusPollInterval: 60_000,
} as const;

export type SiteConfig = typeof site;

export const discordUrl = site.links.discordInvite
  ? `https://discord.gg/${site.links.discordInvite}`
  : "";

export const navigation = [
  { label: "О сервере", href: "/#about" },
  { label: "Как начать", href: "/#start" },
  { label: "Онлайн", href: "/#live" },
  { label: "Мир", href: "/#world" },
  { label: "Правила", href: "/rules" },
  { label: "FAQ", href: "/#faq" },
] as const;
