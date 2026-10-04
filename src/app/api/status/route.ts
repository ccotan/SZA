import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { getServerStatus } from "@/lib/server-status";

export const revalidate = 30;

export async function GET() {
  const status = await getServerStatus(site.server.address);
  return NextResponse.json(status, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}
