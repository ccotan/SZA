import { discordUrl, site } from "@/config/site";
import { getDiscordCommunity } from "@/lib/discord";
import { formatNumber, pluralize } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DiscordMark, Icon } from "@/components/ui/Icon";

export async function Community() {
  const data = await getDiscordCommunity(site.links.discordInvite);

  return (
    <section id="community" aria-labelledby="community-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-12 text-white sm:rounded-[40px] sm:px-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-white/60">
                <DiscordMark size={18} /> Сообщество
              </p>
              <h2 id="community-title" className="mt-6 text-[32px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
                Сервер живёт в Discord
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                Заявки в whitelist, анонсы, совместные проекты и помощь новичкам. Здесь же — связь с администрацией.
              </p>
              <div className="mt-9">
                {discordUrl ? (
                  <ButtonLink href={discordUrl} external size="lg" variant="inverse">
                    Присоединиться <Icon name="arrowUpRight" size={17} />
                  </ButtonLink>
                ) : (
                  <p className="text-[15px] text-white/50">Ссылка-приглашение появится в ближайшее время.</p>
                )}
              </div>
            </div>

            {data && (data.members !== null || data.online !== null) && (
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] bg-white/10">
                {data.members !== null && (
                  <Stat label={pluralize(data.members, { one: "участник", few: "участника", many: "участников" })} value={data.members} />
                )}
                {data.online !== null && <Stat label="сейчас в сети" value={data.online} live />}
              </dl>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ label, value, live }: { label: string; value: number; live?: boolean }) {
  return (
    <div className="bg-ink p-6">
      <dd className="flex items-center gap-2 text-4xl font-semibold tracking-[-0.03em] tabular-nums">
        {live && <span className="size-2 rounded-full bg-accent" />}
        {formatNumber(value)}
      </dd>
      <dt className="mt-1 text-sm text-white/50">{label}</dt>
    </div>
  );
}
