import "server-only";

export type DiscordCommunity = {
  name: string | null;
  members: number | null;
  online: number | null;
};

type InviteResponse = {
  guild?: { name: string };
  approximate_member_count?: number;
  approximate_presence_count?: number;
};

/** Публичный эндпоинт инвайта Discord — без токена бота. Для расширенных данных позже подключается Bot API. */
export async function getDiscordCommunity(invite: string): Promise<DiscordCommunity | null> {
  if (!invite) return null;
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${encodeURIComponent(invite)}?with_counts=true`,
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as InviteResponse;
    return {
      name: data.guild?.name ?? null,
      members: data.approximate_member_count ?? null,
      online: data.approximate_presence_count ?? null,
    };
  } catch {
    return null;
  }
}
