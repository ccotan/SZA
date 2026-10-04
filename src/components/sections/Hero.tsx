import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CopyIp } from "@/components/ui/CopyIp";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Landscape } from "@/components/visual/Landscape";

export function Hero() {
  const [first, second] = site.tagline.split(". ");
  return (
    <section aria-labelledby="hero-title" className="pt-[76px] sm:pt-[88px]">
      <Container className="px-3 sm:px-8">
        <div className="page-in relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-[32px] sm:min-h-[min(820px,calc(100svh-112px))] sm:rounded-[40px]">
          <Landscape seed={11} horizon={120} className="absolute inset-0 -z-10 size-full" />

          <div className="flex flex-col items-start px-6 pt-8 sm:px-12 sm:pt-14 lg:px-16 lg:pt-16">
            <div className="rounded-full bg-white/70 px-4 py-2 backdrop-blur-md">
              <StatusBadge />
            </div>

            <h1 id="hero-title" className="mt-7 text-[44px] leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:mt-9 sm:text-7xl lg:text-[88px]">
              {first}.
              <br />
              <span className="text-ink/45">{second}</span>
            </h1>

            <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed text-ink-2 sm:mt-7 sm:text-xl">
              {site.description}
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row">
              <ButtonLink href="#start" size="lg">
                Начать играть
              </ButtonLink>
              <ButtonLink href="#about" size="lg" variant="inverse">
                Узнать больше
              </ButtonLink>
            </div>
          </div>

          <div className="min-h-24 flex-1" />

          <div className="m-3 sm:m-6 lg:m-8 lg:self-start">
            <div className="flex flex-col gap-3 rounded-[22px] bg-white/60 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-5 sm:p-2 sm:pl-5">
              <div className="flex items-center justify-between gap-4 px-2 pt-1 sm:block sm:p-0">
                <p className="text-xs font-medium tracking-wide text-muted uppercase">Адрес сервера</p>
                <p className="text-sm text-ink-2 sm:mt-0.5">
                  {site.server.edition} · {site.server.version}
                </p>
              </div>
              <CopyIp tone="glass" className="sm:w-[340px] sm:bg-white" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
