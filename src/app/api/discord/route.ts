import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { getDiscordCommunity } from "@/lib/discord";

export const revalidate = 300;

export async function GET() {
  const data = await getDiscordCommunity(site.links.discordInvite);
  return NextResponse.json(data);
}
