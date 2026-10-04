import { site } from "@/config/site";
import { gallery } from "@/content/gallery";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Landscape } from "@/components/visual/Landscape";

export function World() {
  const hasMap = Boolean(site.links.mapUrl);
  return (
    <Section
      id="world"
      eyebrow="Мир"
      title="Один мир на всех"
      lead="Города, дороги и фермы игроков — на живой карте, которая обновляется вместе с миром."
    >
      <Reveal className="group relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] sm:min-h-[560px]">
        <Landscape
          seed={42}
          palette="dusk"
          clouds={false}
          className="absolute inset-0 -z-10 size-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
        <div className="m-3 flex flex-col gap-5 rounded-[22px] bg-white/75 p-5 backdrop-blur-xl sm:m-6 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:max-w-xl">
          <div>
            <p className="flex items-center gap-2 text-lg font-semibold">
              <Icon name="map" size={20} /> Интерактивная карта
            </p>
            <p className="mt-1 text-[15px] text-muted">
              {hasMap ? "3D-рендер мира в браузере, без установки." : "Карта подключается и скоро будет доступна."}
            </p>
          </div>
          {hasMap ? (
            <ButtonLink href="/map" variant="primary" className="shrink-0">
              Открыть карту <Icon name="arrow" size={16} />
            </ButtonLink>
          ) : (
            <span className="shrink-0 self-start rounded-full sm:self-auto bg-surface px-3 py-1.5 text-sm text-muted">Скоро</span>
          )}
        </div>
      </Reveal>

      {gallery.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal as="figure" key={g.src} delay={i * 70} className="group overflow-hidden rounded-[var(--radius-card)] bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="p-5 text-[15px]">
                <span className="font-medium">{g.title}</span>
                {g.author && <span className="text-muted"> · {g.author}</span>}
              </figcaption>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
