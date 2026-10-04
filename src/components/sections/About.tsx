import { specs, vanilla } from "@/content/server";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="О сервере"
      title="Minecraft, каким он должен быть"
      lead="Небольшое сообщество, один общий мир и никаких механик поверх игры. Всё остальное — за вами."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="rounded-[var(--radius-card)] bg-surface p-6 sm:p-10">
          <h3 className="text-sm font-medium text-muted">Характеристики</h3>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1.5 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{s.value}</dd>
                {s.note && <dd className="mt-1 text-sm leading-snug text-muted">{s.note}</dd>}
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={80} className="rounded-[var(--radius-card)] border border-line p-6 sm:p-10">
          <h3 className="text-sm font-medium text-muted">Что значит «ванильный»</h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <VanillaList title="Есть" items={vanilla.yes} positive />
            <VanillaList title="Нет" items={vanilla.no} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function VanillaList({ title, items, positive }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div>
      <p className="text-lg font-semibold">{title}</p>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-snug text-ink-2">
            <span
              className={`mt-px grid size-5 shrink-0 place-items-center rounded-full ${positive ? "bg-accent-soft text-accent" : "bg-surface text-muted"}`}
            >
              <Icon name={positive ? "check" : "x"} size={12} strokeWidth={2.4} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
